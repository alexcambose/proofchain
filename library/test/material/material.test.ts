import Web3 from 'web3';
import Proofchain from '../../src';
import CompanyEntityTypeEnum from '../../src/enums/CompanyEntityTypeEnum';
import { deployedFactoryAddress, provider } from '../provider';

describe('raw material', () => {
  let proofchain: Proofchain;
  let account: string;
  beforeAll(async () => {
    // @ts-ignore
    [account] = await new Web3(provider).eth.getAccounts();
    proofchain = await Proofchain.providerInit({
      web3Provider: provider,
      factoryContractAddress: await deployedFactoryAddress(),
      fromAddress: account,
    });
    await proofchain.company.create({
      name: 'company',
      entityType: CompanyEntityTypeEnum.MANUFACTURER,
    });
  });
  describe('create', () => {
    it('creates a new material', async () => {
      const result = await proofchain.material.create({
        name: 'product',
        code: '123',
        amountIdentifier: 'kg',
      });
      expect(result.events.MaterialCreate.company).toEqual(account);
      expect(result.events.MaterialCreate.materialTokenId).toEqual('0');
      const result2 = await proofchain.material.create({
        name: 'product',
        code: '123',
        amountIdentifier: 'kg',
        recipeMaterialTokenId: [result.events.MaterialCreate.materialTokenId],
        recipeMaterialAmount: [2],
      });
      expect(result2.events.MaterialCreate.company).toEqual(account);
      expect(result2.events.MaterialCreate.materialTokenId).toEqual('1');
    });
    it('throws error if the specified recipe material id does not exist', async () => {
      const resultPromise = proofchain.material.create({
        name: 'product',
        code: '123',
        amountIdentifier: 'kg',
        images: ['a'],
        recipeMaterialTokenId: [99],
        recipeMaterialAmount: [2],
      });
      await expect(resultPromise).rejects.toThrow();
    });
  });
  describe('all', () => {
    it('returns all created materials', async () => {
      // at this point the length should be greater than 1
      await proofchain.material.create({
        name: 'product',
        code: '123',
        amountIdentifier: 'kg',
      });
      const materials = await proofchain.material.all();
      expect(materials.length > 1).toEqual(true);
    });
    it('filters to return only materials or raw materials', async () => {
      const rawMaterial = await proofchain.material.create({
        name: 'product',
        code: '123',
        amountIdentifier: 'kg',
      });
      await proofchain.material.create({
        name: 'product_not_raw',
        code: '123',
        amountIdentifier: 'kg',
        recipeMaterialTokenId: [
          rawMaterial.events.MaterialCreate.materialTokenId,
        ],
        recipeMaterialAmount: [2],
      });
      const onlyRawMaterials = await proofchain.material.all({
        onlyRawMaterials: true,
      });
      const materials = await proofchain.material.all();
      const onlyMaterials = await proofchain.material.all({
        onlyMaterials: true,
      });
      expect(
        onlyRawMaterials.find((e) => e!.name === 'product_not_raw')
      ).toEqual(undefined);
      expect(materials.find((e) => e!.name === 'product_not_raw')).not.toEqual(
        undefined
      );
      expect(
        onlyMaterials.find((e) => e!.name === 'product_not_raw')
      ).not.toEqual(undefined);
    });
  });
  describe('getById', () => {
    it('returns a material based on the materialTokenId', async () => {
      // at this point the length should be greater than 1
      const result = await proofchain.material.create({
        name: 'product',
        code: '123',
        amountIdentifier: 'kg',
        images: ['a'],
      });
      const fetched = await proofchain.material.getById(
        result.events.MaterialCreate.materialTokenId
      );
      expect(fetched!.name).toEqual('product');
      expect(fetched!.code).toEqual('123');
    });
  });
  describe('countAll', () => {
    it('returns all created materials', async () => {
      // at this point the length should be greater than 1
      await proofchain.material.create({
        name: 'product',
        code: '123',
        images: ['a'],
        amountIdentifier: 'kg',
      });
      const length = await proofchain.material.countAll();
      expect(length > 1).toEqual(true);
    });
  });
  describe('mint', () => {
    describe('raw material', () => {
      it('adds to the balance', async () => {
        const product = await proofchain.material.create({
          name: 'product',
          code: '123',
          amountIdentifier: 'kg',
        });
        const { materialTokenId } = product.events.MaterialCreate;
        const oldBalance = await proofchain.material.getBalance(
          materialTokenId
        );
        await proofchain.material.mint({
          materialTokenId: product.events.MaterialCreate.materialTokenId,
          amount: 2,
        });
        const newBalance = await proofchain.material.getBalance(
          materialTokenId
        );
        expect(newBalance).toEqual(oldBalance + 2);
      });
      it('returns MaterialTransfer event', async () => {
        const product = await proofchain.material.create({
          name: 'product',
          code: '123',
          amountIdentifier: 'kg',
        });
        const { materialTokenId } = product.events.MaterialCreate;
        const result = await proofchain.material.mint({
          materialTokenId,
          amount: 2,
        });
        for (let event of result.events.MaterialTransfer) {
          expect(event.from).toEqual(
            '0x0000000000000000000000000000000000000000'
          );
          expect(event.to).toEqual(account);
          expect(event.uuid).not.toEqual(undefined);
        }
      });
    });
  });
  describe('getBalance', () => {
    it('returns the available balance of a material', async () => {});
  });
  describe('getTransfers', () => {
    it('filters by `to` address', async () => {
      const transfers = await proofchain.material.getTransfers({ to: account });
      expect(transfers.length > 0).toBeTruthy();
    });
  });
  describe('getMaterialByUuid', () => {
    it('returns the material by uuid', async () => {
      const product = await proofchain.material.create({
        name: 'product',
        code: '123',
        amountIdentifier: 'kg',
      });
      const { materialTokenId } = product.events.MaterialCreate;
      const result = await proofchain.material.mint({
        materialTokenId,
        amount: 2,
      });
      const fetchedMaterial = await proofchain.material.getMaterialByUuid(
        result.events.MaterialTransfer[0].uuid
      );
      expect(fetchedMaterial.materialTokenId).toEqual(materialTokenId);
    });
  });
  describe('getOwnedMaterialsUuid', () => {
    it('returns the owned material uuids', async () => {
      const product = await proofchain.material.create({
        name: 'product',
        code: '123',
        amountIdentifier: 'kg',
      });
      const { materialTokenId } = product.events.MaterialCreate;
      const result = await proofchain.material.mint({
        materialTokenId,
        amount: 2,
      });
      const fetchedMaterials = await proofchain.material.getOwnedMaterialsUuid(
        materialTokenId
      );
      expect(fetchedMaterials.length).toEqual(2);
    });
  });
});
