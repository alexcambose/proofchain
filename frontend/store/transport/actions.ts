import { createAsyncThunk } from '@reduxjs/toolkit';
import transactionWrapper from '@utils/transactionWrapper';
import proofchain from 'proofchain';

export const fetchTransports = createAsyncThunk(
  'material/fetchTransports',
  async () => {
    try {
      let transports = await proofchain().transport.all();

      return { transports };
    } catch (e) {
      console.log(e);
    }
    return { transports: [] };
  }
);
export const initiateTransport = createAsyncThunk(
  'material/initiateTransport',
  async ({
    receiver,
    transportCompany,
    batchIds,
  }: {
    receiver: string;
    transportCompany: string;
    batchIds: number[];
  }) => {
    const result = await transactionWrapper(() =>
      proofchain().transport.initiate({
        receiver,
        transportCompany,
        batchIds,
      })
    );

    // return { batches };
  }
);
