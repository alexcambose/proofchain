import { ITransportStore } from './interface';

const initialState: ITransportStore = {
  transports: [],
  loadingTransports: false,
  transportInfo: {
    transport: null,
    createdTimestamp: null,
    batchInfo: [],
    events: [
      {
        transportEvent: null,
        timestamp: 0,
      },
    ],
  },
};

export default initialState;
