import Base from './Base';
import IEmittedEvent from './interface/IEmittedEvent';
import MinedTransaction from './MinedTransaction';
enum TransportStatusEnum {
  READY_FOR_TRANSIT,
  PENDING_TRANSIT,
  IN_TRANSIT,
  FINALISED,
}
interface ITransport {
  sender: string;
  receiver: string;
  transportCompany: string;
  batchIds: number[];
  value: string;
  status: TransportStatusEnum;
  hashedPassword: string;
}
type TransportInitiatedEvent = {
  sender: string;
  receiver: string;
  transportCompany: string;
  transportId: number;
  event: IEmittedEvent;
};
type TransportStatusEvent = {
  transportId: number;
  status: TransportStatusEnum;
  event: IEmittedEvent;
};
class Transport extends Base {
  TransportStatusEnum = TransportStatusEnum;
  async initiate({
    receiver,
    transportCompany,
    batchIds,
    hashedPassword,
  }: {
    receiver: string;
    batchIds: number[];
    transportCompany: string;
    hashedPassword?: string;
  }): Promise<
    MinedTransaction<{ TransportInitiated: TransportInitiatedEvent }>
  > {
    await this.ensureContract();
    let transaction;
    if (hashedPassword) {
      transaction = await this.contract.methods
        .initiateTransport(receiver, transportCompany, batchIds, hashedPassword)
        .send({ from: this.fromAddress, gas: 300000 });
    } else {
      transaction = await this.contract.methods
        .initiateTransport(receiver, transportCompany, batchIds)
        .send({ from: this.fromAddress, gas: 300000 });
    }
    return new MinedTransaction<{
      TransportInitiated: TransportInitiatedEvent;
    }>(transaction);
  }
  async setTransportStatus({
    transportId,
    status,
  }: {
    transportId: number;
    status: TransportStatusEnum;
  }): Promise<MinedTransaction<{ TransportStatus: TransportStatusEvent }>> {
    await this.ensureContract();
    const transaction = await this.contract.methods
      .setTransportStatus(transportId, status)
      .send({ from: this.fromAddress, gas: 300000 });
    return new MinedTransaction<{
      TransportStatus: TransportStatusEvent;
    }>(transaction);
  }
  async finaliseTransport({
    transportId,
    hashedPassword,
  }: {
    transportId: number;
    hashedPassword?: string;
  }): Promise<MinedTransaction<{ TransportStatus: TransportStatusEvent }>> {
    await this.ensureContract();

    let transaction;
    if (hashedPassword) {
      transaction = await this.contract.methods
        .finaliseTransport(transportId, hashedPassword)
        .send({ from: this.fromAddress, gas: 300000 });
    } else {
      transaction = await this.contract.methods
        .finaliseTransport(transportId)
        .send({ from: this.fromAddress, gas: 300000 });
    }
    return new MinedTransaction<{
      TransportStatus: TransportStatusEvent;
    }>(transaction);
  }
  async getById(transportId: number): Promise<ITransport> {
    await this.ensureContract();

    const transport: ITransport = await this.contract.methods
      .transports(transportId)
      .call();
    transport.batchIds = await this.contract.methods
      .getTransportBatchids(transportId)
      .call();
    return transport;
  }
  async all({
    sender,
    receiver,
    transportCompany,
  }: {
    sender?: string;
    receiver?: string;
    transportCompany?: string;
  } = {}) {
    await this.ensureContract();
    const createEvents = await this.getPastEvents<TransportInitiatedEvent>(
      'TransportInitiated',
      {
        sender,
        receiver,
        transportCompany,
      }
    );
    let transports = [];
    for (let createEvent of createEvents) {
      const fetchedBatch = await this.getById(createEvent.transportId);
      transports.push(fetchedBatch);
    }
    return transports;
  }

  async getStatusEvents(transportId: number): Promise<TransportStatusEvent[]> {
    await this.ensureContract();

    const events = await this.getPastEvents<TransportStatusEvent>(
      'TransportStatus',
      {
        transportId,
      }
    );
    return events;
  }
}
export default Transport;
