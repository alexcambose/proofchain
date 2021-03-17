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
        materialTokenId,
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
        materialTokenId,
        materialsUuid: [materialsUuid[1]],
        code: '1',
      });
      const fetchedBatch = await proofchain.batch.getById(
        result.events.BatchCreate.batchId
      );
      expect(fetchedBatch.code).toEqual('1');
      expect(fetchedBatch.materialTokenId).toEqual(materialTokenId);
      expect(fetchedBatch.materialsUuid).toEqual([materialsUuid[1]]);
    });
  });
  describe('burn', () => {
    it('decreases batch material quantity', async () => {
      const result = await proofchain.batch.create({
        materialTokenId,
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
        oldBatch.materialsUuid.length - newBatch.materialsUuid.length
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
});