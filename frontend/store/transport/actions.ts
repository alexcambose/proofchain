import { createAsyncThunk } from '@reduxjs/toolkit';
import transactionWrapper from '@utils/transactionWrapper';
import { ITransport } from 'interface';
import proofchain from 'proofchain';
import web3Instance from 'web3Instance';
const getTransports = async (props = {}) => {
  let transports = await proofchain().transport.all(props);
  transports = await Promise.all(
    transports.map(async (e) => ({
      ...e,
      events: {
        TransportCreated: (
          await proofchain().company.getRawPastEvents('TransportCreated', {
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
export const createTransport = createAsyncThunk(
  'transport/createTransport',
  async ({
    receiver,
    transportCompany,
    batchIds,
    password,
  }: {
    receiver: string;
    transportCompany: string;
    batchIds: number[];
    password?: string;
  }) => {
    const result = await transactionWrapper(() =>
      proofchain().transport.initiate({
        receiver,
        transportCompany,
        batchIds,
        password,
      })
    );
    if (!result) throw new Error('Error!');
    // return { batches };
  }
);

export const fetchTransportInfo = createAsyncThunk(
  'transport/fetchTransportInfo',
  async ({ transportId }: { transportId: number }) => {
    let transport: ITransport = (await proofchain().transport.getById(
      transportId
    )) as ITransport;
    transport.events = {
      TransportCreated: (
        await proofchain().company.getRawPastEvents('TransportCreated', {
          transportCompany: transport.transportCompany,
          sender: transport.sender,
          receiver: transport.receiver,
        })
      ).find(
        (event) => event.returnValues.transportId === transport.transportId
      ),
    };
    const batchInfo = await Promise.all(
      transport.batchIds.map(async (e) => await proofchain().batch.getById(e))
    );
    const createdTimestamp = (
      await web3Instance().eth.getBlock(
        transport.events.TransportCreated.blockNumber
      )
    ).timestamp;

    const events = await Promise.all(
      (await proofchain().transport.getStatusEvents(transportId)).map(
        async (event) => ({
          event,
          timestamp: (
            await web3Instance().eth.getBlock(event.event.blockNumber)
          ).timestamp,
        })
      )
    );
    return {
      transport,
      batchInfo,
      createdTimestamp,
      events,
    };
  }
);
