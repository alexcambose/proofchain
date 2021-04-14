import Web3 from 'web3';
import Proofchain from '../../src/Proofchain';
import { CompanyEntityTypeEnum } from '../../src/enums';
import { deployedFactoryAddress, provider } from '../provider';

describe('material', () => {
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
    await proofchain.company
      .create({
        name: 'company',
        entityType: CompanyEntityTypeEnum.MANUFACTURER,
      })
      .send();
  });
  describe('mint', () => {
    describe('raw material', () => {
      it('adds to the balance', async () => {
        const product = await proofchain.material
          .create({
            name: 'product',
            code: '123',
            amountIdentifier: 'kg',
          })
          .send();
        const { materialTokenId } = product.events.MaterialCreate;
        const oldBalance = await proofchain.material.getBalance(
          materialTokenId
        );
        await (
          await proofchain.material.mint({
            materialTokenId: product.events.MaterialCreate.materialTokenId,
            amount: 2,
          })
        ).send();
        const newBalance = await proofchain.material.getBalance(
          materialTokenId
        );
        expect(newBalance).toEqual(oldBalance + 2);
      });
      it('returns MaterialTransfer event', async () => {
        const product = await proofchain.material
          .create({
            name: 'product',
            code: '123',
            amountIdentifier: 'kg',
          })
          .send();
        const { materialTokenId } = product.events.MaterialCreate;
        const result = await (
          await proofchain.material.mint({
            materialTokenId,
            amount: 2,
          })
        ).send();
        for (let event of result.events.MaterialTransfer) {
          expect(event.from).toEqual(
            '0x0000000000000000000000000000000000000000'
          );
          expect(event.to).toEqual(account);
          expect(event.uuid).not.toEqual(undefined);
        }
      });
    });
    describe('getTransfers', () => {
      it('filters by `to` address', async () => {
        const transfers = await proofchain.material.getTransfers({
          to: account,
        });
        expect(transfers.length > 0).toBeTruthy();
      });
    });
    describe('material', () => {
      let materialTokenId1: number;
      let materialTokenId2: number;
      let materialTokenId1Uuids: number[];
      let materialTokenId2Uuids: number[];
      let batchId1: number;
      let batchId2: number;
      beforeAll(async () => {
        const result1 = await proofchain.material
          .create({
            name: 'product1',
            code: '123',
            amountIdentifier: 'kg',
          })
          .send();
        const result2 = await proofchain.material
          .create({
            name: 'product1',
            code: '123',
            amountIdentifier: 'kg',
          })
          .send();
        materialTokenId1 = result1.events.MaterialCreate.materialTokenId;
        materialTokenId2 = result2.events.MaterialCreate.materialTokenId;
        const mintResult1 = await (
          await proofchain.material.mint({
            materialTokenId: materialTokenId1,
            amount: 5,
          })
        ).send();
        const mintResult2 = await (
          await proofchain.material.mint({
            materialTokenId: materialTokenId2,
            amount: 5,
          })
        ).send();
        materialTokenId1Uuids = mintResult1.events.MaterialTransfer.map(
          (e) => e.uuid
        );
        materialTokenId2Uuids = mintResult2.events.MaterialTransfer.map(
          (e) => e.uuid
        );
        const createBatchResult1 = await proofchain.batch.create({
          materialsUuid: materialTokenId1Uuids,
          code: '1',
        });
        const createBatchResult2 = await proofchain.batch.create({
          materialsUuid: materialTokenId2Uuids,
          code: '1',
        });
        batchId1 = createBatchResult1.events.BatchCreate.batchId;
        batchId2 = createBatchResult2.events.BatchCreate.batchId;
      });
      it('mints using multiple batches', async () => {
        const product = await proofchain.material
          .create({
            name: 'product',
            code: '123',
            amountIdentifier: 'kg',
            recipeMaterialTokenId: [materialTokenId1, materialTokenId2],
            recipeMaterialAmount: [2, 3],
          })
          .send();

        const materialTokenId3 = product.events.MaterialCreate.materialTokenId;
        const mintResult3 = await (
          await proofchain.material.mint({
            materialTokenId: materialTokenId3,
            fromBatchId: [batchId2, batchId1],
            fromBatchMaterialsUuid: [
              [
                materialTokenId2Uuids[1],
                materialTokenId2Uuids[2],
                materialTokenId2Uuids[3],
              ],
              [materialTokenId1Uuids[2], materialTokenId1Uuids[4]],
            ],
          })
        ).send();

        const fetchedBatch1 = await proofchain.batch.getById(batchId1);
        const fetchedBatch2 = await proofchain.batch.getById(batchId2);
        expect(fetchedBatch1?.materialsUuid).toEqual([
          materialTokenId1Uuids[0],
          materialTokenId1Uuids[1],
          materialTokenId1Uuids[3],
        ]);
        expect(fetchedBatch2?.materialsUuid).toEqual([
          materialTokenId2Uuids[0],
          materialTokenId2Uuids[4],
        ]);
      });
    });
  });
});
