import { IBatch, ITransport } from 'interface';

export interface ITransportStore {
  transports: ITransport[];
  loadingTransports: boolean;
  transportInfo: {
    transport: ITransport;
    createdTimestamp: number;
    batchInfo: IBatch[];
    events: [
      {
        transportEvent?: Transport;
        timestamp;
      }
    ];
  };
}
