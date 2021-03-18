import { IBatch, ITransport } from 'interface';

export interface ITransportStore {
  transports: ITransport[];
  loadingTransports: boolean;
}
