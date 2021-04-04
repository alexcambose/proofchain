import Web3 from 'web3';
import Proofchain from '../src';
import CompanyEntityTypeEnum from '../src/enums/CompanyEntityTypeEnum';
import { deployedFactoryAddress, provider } from './provider';

describe('batch', () => {
  let proofchain: Proofchain;
  let account: string;
  let materialTokenId: number;
  let materialsUuid: number[];
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
    const result = await proofchain.material.create({
      name: 'product',
      code: '123',
      amountIdentifier: 'kg',
    });
    materialTokenId = result.events.MaterialCreate.materialTokenId;

    const mintResult = await proofchain.material.mint({
      materialTokenId: materialTokenId,
      amount: 5,
    });
    materialsUuid = mintResult.events.MaterialTransfer.map((e) => e.uuid);
  });
  describe('create', () => {
    it('creates a new batch', async () => {
      const oldBalance = await proofchain.material.getBalance(materialTokenId);
      const result = await proofchain.batch.create({
        materialsUuid: [materialsUuid[0]],
        code: '1',
      });
      const newBalance = await proofchain.material.getBalance(materialTokenId);
      expect(result.events.BatchCreate.company).toEqual(account);
      expect(oldBalance - newBalance).toEqual(1);
    });
  });
  describe('getById', () => {
    it('return a batch by batchId', async () => {
      const result = await proofchain.batch.create({
        materialsUuid: [materialsUuid[1]],
        code: '1',
      });
      const fetchedBatch = await proofchain.batch.getById(
        result.events.BatchCreate.batchId
      );
      expect(fetchedBatch!.code).toEqual('1');
      expect(fetchedBatch!.materialTokenId).toEqual(materialTokenId);
      expect(fetchedBatch!.materialsUuid).toEqual([materialsUuid[1]]);
    });
  });
  describe('burn', () => {
    it('decreases batch material quantity', async () => {
      const result = await proofchain.batch.create({
        materialsUuid: [materialsUuid[2], materialsUuid[3]],
        code: '1',
      });
      const batchId = result.events.BatchCreate.batchId;
      const oldBatch = await proofchain.batch.getById(batchId);
      await proofchain.batch.burn({
        batchId,
        materialsUuid: [materialsUuid[2]],
      });
      const newBatch = await proofchain.batch.getById(batchId);
      expect(
        oldBatch!.materialsUuid.length - newBatch!.materialsUuid.length
      ).toEqual(1);
    });
  });
  describe('all', () => {
    it('returns all created batches', async () => {
      // at this point the length should be greater than 1
      const batches = await proofchain.batch.all();
      expect(batches.length > 1).toEqual(true);
    });
  });
  describe('remove', () => {
    it('removes a batch from the user', async () => {
      const oldBatches = await proofchain.batch.all();
      // @ts-ignore
      await proofchain.batch.remove(oldBatches[0]?.batchId);
      const newBatches = await proofchain.batch.all();
      expect(oldBatches.length - newBatches.length).toEqual(1);
    });
  });
  describe('destroyBatch', () => {
    let materialTokenId: number, batchId: number;
    beforeEach(async () => {
      const materialCreateResult = await proofchain.material.create({
        name: 'product',
        code: '123',
        amountIdentifier: 'kg',
      });
      materialTokenId =
        materialCreateResult.events.MaterialCreate.materialTokenId;

      const mintResult = await proofchain.material.mint({
        materialTokenId: materialTokenId,
        amount: 5,
      });
      materialsUuid = mintResult.events.MaterialTransfer.map((e) => e.uuid);
      const result = await proofchain.batch.create({
        materialsUuid: materialsUuid,
        code: '1',
      });
      batchId = result.events.BatchCreate.batchId;
    });
    it('removes the batch from all batches return values', async () => {
      const oldFetchedBatches = await proofchain.batch.all();
      await proofchain.batch.destroyBatch(batchId);
      const newFetchedBatches = await proofchain.batch.all();
      expect(oldFetchedBatches.length - newFetchedBatches.length).toEqual(1);
    });
    it('adds to the balance of materials', async () => {
      const oldFetchedBalance = await proofchain.material.getBalance(
        materialTokenId
      );
      await proofchain.batch.destroyBatch(batchId);
      const newFetchedBalance = await proofchain.material.getBalance(
        materialTokenId
      );
      expect(newFetchedBalance - oldFetchedBalance).toEqual(5);
    });
  });
});
