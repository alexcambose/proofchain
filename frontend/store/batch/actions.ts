import { createAsyncThunk } from '@reduxjs/toolkit';
import transactionWrapper from '@utils/transactionWrapper';
import { IBatch } from 'interface';
import proofchain from 'proofchain';
import web3Instance from 'web3Instance';

export const fetchBatches = createAsyncThunk(
  'material/fetchBatches',
  async () => {
    try {
      let batches = await proofchain().batch.all();
      batches = await Promise.all(
        batches.map(async (e) => ({
          ...e,
          events: {
            BatchCreate: (
              await proofchain().batch.getRawPastEvents('BatchCreate', {
                company: proofchain().batch.fromAddress,
              })
            )[0],
          },
        }))
      );
      return { batches };
    } catch (e) {
      console.log(e);
    }
    return { batches: [] };
  }
);
export const createBatch = createAsyncThunk(
  'material/createBatch',
  async ({
    code,
    materialsUuid,
  }: {
    code: string;
    materialsUuid: number[];
  }) => {
    const result = await transactionWrapper(() =>
      proofchain().batch.create({
        code,
        materialsUuid,
      })
    );

    // return { batches };
  }
);

export const fetchBatchInfo = createAsyncThunk(
  'batch/fetchBatchInfo',
  async ({ batchId }: { batchId: number }) => {
    let batch: IBatch = (await proofchain().batch.getById(batchId)) as IBatch;
    batch.events = { BatchCreate: null };
    batch.events.BatchCreate = (
      await proofchain().batch.getRawPastEvents('BatchCreate', {
        company: proofchain().batch.fromAddress,
        batchId: batch.batchId,
      })
    )[0];
    const materialsInfo = await Promise.all(
      batch.materialsUuid.map(
        async (e) => await proofchain().material.getMaterialByUuid(e)
      )
    );
    const createdTimestamp = (
      await web3Instance().eth.getBlock(batch.events.BatchCreate.blockNumber)
    ).timestamp;
    return {
      batch,
      materialsInfo,
      createdTimestamp,
    };
  }
);
