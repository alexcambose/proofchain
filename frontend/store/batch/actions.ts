import { createAsyncThunk } from '@reduxjs/toolkit';
import transactionWrapper from '@utils/transactionWrapper';
import proofchain from 'proofchain';

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
    materialTokenId,
    materialTokenAmount,
  }: {
    code: string;
    materialTokenId: number;
    materialTokenAmount: number;
  }) => {
    const result = await transactionWrapper(() =>
      proofchain().batch.create({
        code,
        materialTokenId,
        materialTokenAmount,
      })
    );

    // return { batches };
  }
);
