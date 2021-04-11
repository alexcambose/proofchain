import Web3 from 'web3';
import Base from './Base';
import IEmittedEvent from './interface/IEmittedEvent';
import MinedTransaction from './MinedTransaction';
import keccak256 from 'keccak256';
enum TransportStatusEnum {
  NONE,
  READY_FOR_TRANSIT,
  PENDING_TRANSIT,
  IN_TRANSIT,
  PENDING_FINALISED,
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
type TransportCreatedEvent = {
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
    password,
  }: {
    receiver: string;
    batchIds: number[];
    transportCompany: string;
    password?: string;
  }): Promise<MinedTransaction<{ TransportCreated: TransportCreatedEvent }>> {
    await this.ensureContract();
    let transaction;
    if (password) {
      const passwordInHex = keccak256(password).toString('hex');
      console.log(
        passwordInHex,
        Web3.utils.asciiToHex(passwordInHex),
        passwordInHex.substring(2, passwordInHex.length)
      );
      transaction = await this.contract.methods
        .createTransport(
          receiver,
          transportCompany,
          batchIds,
          '0x' + Web3.utils.padLeft(passwordInHex.replace('0x', ''), 64)
        )
        .send({ from: this.fromAddress, gas: 400000 });
    } else {
      transaction = await this.contract.methods
        .createTransport(receiver, transportCompany, batchIds)
        .send({ from: this.fromAddress, gas: 300000 });
    }
    return new MinedTransaction<{
      TransportCreated: TransportCreatedEvent;
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
    password,
  }: {
    transportId: number;
    password?: string;
  }): Promise<MinedTransaction<{ TransportStatus: TransportStatusEvent }>> {
    await this.ensureContract();

    let transaction;
    if (password) {
      transaction = await this.contract.methods
        .finaliseTransport(transportId, password)
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
    transport.batchIds = await this.getBatchIds(transportId);
    return transport;
  }
  async getBatchIds(transportId: number): Promise<number[]> {
    await this.ensureContract();

    const batchIds = await this.contract.methods
      .getTransportBatchids(transportId)
      .call();
    return batchIds;
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
    const createEvents = await this.getPastEvents<TransportCreatedEvent>(
      'TransportCreated',
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
