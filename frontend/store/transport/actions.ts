import { createAsyncThunk } from '@reduxjs/toolkit';
import transactionWrapper from '@utils/transactionWrapper';
import proofchain from 'proofchain';
const getTransports = async (props = {}) => {
  let transports = await proofchain().transport.all(props);
  transports = await Promise.all(
    transports.map(async (e) => ({
      ...e,
      events: {
        TransportInitiated: (
          await proofchain().company.getRawPastEvents('TransportInitiated', {
            transportCompany: e.transportCompany,
            sender: e.sender,
            receiver: e.receiver,
          })
        ).find((event) => event.returnValues.transportId === e.transportId),
      },
    }))
  );
  return transports;
};
export const fetchTransports = createAsyncThunk(
  'transport/fetchTransports',
  async (_, { getState }) => {
    // @ts-ignore
    const address = getState().user.address;
    const transportsSender = await getTransports({ sender: address });
    const transportsReceiver = await getTransports({ receiver: address });
    const transports = [...transportsSender, ...transportsReceiver];
    return { transports };
  }
);
export const fetchYourTransports = createAsyncThunk(
  'transport/fetchYourTransports',
  async (_, { getState }) => {
    // @ts-ignore
    const address = getState().user.address;
    const transports = await getTransports({ transportCompany: address });

    return { transports };
  }
);
export const initiateTransport = createAsyncThunk(
  'transport/initiateTransport',
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
