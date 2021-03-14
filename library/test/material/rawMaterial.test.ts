import Proofchain from '../../src';
import { deployedFactoryAddress, provider } from '../provider';
import Web3 from 'web3';
import CompanyEntityTypeEnum from '../../src/enums/CompanyEntityTypeEnum';

describe('raw material', () => {
  let proofChain: Proofchain;
  let account: string;
  beforeAll(async () => {
    // @ts-ignore
    [account] = await new Web3(provider).eth.getAccounts();
    proofChain = await Proofchain.providerInit({
      web3Provider: provider,
      factoryContractAddress: await deployedFactoryAddress(),
      fromAddress: account,
    });
    const result = await proofChain.company.create({
      name: 'company',
      entityType: CompanyEntityTypeEnum.MANUFACTURER,
    });
  });
  describe('create', () => {
    it('creates a new material', async () => {
      const result = await proofChain.material.create({
        name: 'product',
        code: '123',
      });
      expect(result.events.MaterialCreate.company).toEqual(account);
      expect(result.events.MaterialCreate.materialTokenId).toEqual('0');
    });
  });
  describe('all', () => {
    it('returns all created materials', async () => {
      // at this point the length should be greater than 1
      await proofChain.material.create({
        name: 'product',
        code: '123',
      });
      const materials = await proofChain.material.all();
      expect(materials.length > 1).toEqual(true);
    });
    it('filters to return only materials or raw materials', async () => {
      const rawMaterial = await proofChain.material.create({
        name: 'product',
        code: '123',
      });
      const result = await proofChain.material.create({
        name: 'product_not_raw',
        code: '123',
        recipeMaterialTokenId: [
          rawMaterial.events.MaterialCreate.materialTokenId,
        ],
        recipeMaterialAmount: [2],
      });
      const onlyRawMaterials = await proofChain.material.all({
        onlyRawMaterials: true,
      });
      const materials = await proofChain.material.all();
      const onlyMaterials = await proofChain.material.all({
        onlyMaterials: true,
      });
      expect(
        onlyRawMaterials.find((e) => e.name === 'product_not_raw')
      ).toEqual(undefined);
      expect(materials.find((e) => e.name === 'product_not_raw')).not.toEqual(
        undefined
      );
      expect(
        onlyMaterials.find((e) => e.name === 'product_not_raw')
      ).not.toEqual(undefined);
    });
  });
  describe('getById', () => {
    it('returns a material based on the materialTokenId', async () => {
      // at this point the length should be greater than 1
      const result = await proofChain.material.create({
        name: 'product',
        code: '123',
        images: ['a'],
      });
      const fetched = await proofChain.material.getById(
        result.events.MaterialCreate.materialTokenId
      );
      expect(fetched.name).toEqual('product');
      expect(fetched.code).toEqual('123');
    });
  });
  describe('countAll', () => {
    it('returns all created materials', async () => {
      // at this point the length should be greater than 1
      await proofChain.material.create({
        name: 'product',
        code: '123',
        images: ['a'],
      });
      const length = await proofChain.material.countAll();
      expect(length > 1).toEqual(true);
    });
  });
});
