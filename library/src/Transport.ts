import Web3 from 'web3';
import { Base } from './Base';
import IEmittedEvent from './interface/IEmittedEvent';
import MinedTransaction from './MinedTransaction';
import keccak256 from 'keccak256';
import { Transaction } from './Transaction';
export enum TransportStatusEnum {
  /**
   * Transport has no status set. It was just created
   */
  NONE,
  /**
   * Transport is ready for transit
   */
  READY_FOR_TRANSIT,
  /**
   * Transport is awaiting transit.
   */
  PENDING_TRANSIT,
  /**
   * Transport is in transit
   */
  IN_TRANSIT,
  /**
   * Transport is pending to be finalised
   */
  PENDING_FINALISED,
  /**
   * Transport is finalised
   */
  FINALISED,
}
export interface ITransport {
  /**
   * Transport sneder address
   */
  sender: string;
  /**
   * Transport receiver address
   */
  receiver: string;
  /**
   * Transport company address associated with this transport instance
   */
  transportCompany: string;
  /**
   * Transport batches id
   */
  batchIds: number[];
  /**
   * Transport values as price
   */
  value: string;
  /**
   * Transport status
   */
  status: TransportStatusEnum;
  /**
   * Transport password
   */
  hashedPassword?: string;
}
export type TransportCreatedEvent = {
  sender: string;
  receiver: string;
  transportCompany: string;
  transportId: number;
  event: IEmittedEvent;
};
export type TransportStatusEvent = {
  transportId: number;
  status: TransportStatusEnum;
  event: IEmittedEvent;
};
class Transport extends Base {
  TransportStatusEnum = TransportStatusEnum;
  /**
   * Creates a new transport
   * @param options Transport options
   * @param options.receiver Transport receiver
   * @param options.batchIds Transport batches
   * @param options.transportCompany Transport company
   * @param options.password Transport password
   * @returns Transport created event
   */
  initiate(options: {
    receiver: string;
    batchIds: number[];
    transportCompany: string;
    password?: string;
  }): Transaction<{ TransportCreated: TransportCreatedEvent }> {
    const { receiver, transportCompany, batchIds, password } = options;
    let transaction;
    if (password) {
      const passwordInHex = keccak256(password).toString('hex');
      transaction = this.contract.methods.createTransport(
        receiver,
        transportCompany,
        batchIds,
        '0x' + Web3.utils.padLeft(passwordInHex.replace('0x', ''), 64)
      );
    } else {
      transaction = this.contract.methods.createTransport(
        receiver,
        transportCompany,
        batchIds
      );
    }
    return new Transaction<{
      TransportCreated: TransportCreatedEvent;
    }>(transaction, this.fromAddress);
  }
  /**
   * Set a new status to a transport
   * @param options Transport status options
   * @param options.transportId Traget transport id
   * @param options.status Transport status to be set
   * @returns Transport status chaged event
   */
  setTransportStatus(options: {
    transportId: number;
    status: TransportStatusEnum;
  }): Transaction<{ TransportStatus: TransportStatusEvent }> {
    const { transportId, status } = options;
    const transaction = this.contract.methods.setTransportStatus(
      transportId,
      status
    );

    return new Transaction<{
      TransportStatus: TransportStatusEvent;
    }>(transaction, this.fromAddress);
  }
  /**
   * Sets a transport as finalised
   * @param options Transport finalisation options
   * @param options.transportId Traget transport id
   * @param options.password Transport password
   * @returns Transport finalised event
   */
  finaliseTransport(options: {
    transportId: number;
    password?: string;
  }): Transaction<{ TransportStatus: TransportStatusEvent }> {
    const { transportId, password } = options;

    let transaction;
    if (password) {
      transaction = this.contract.methods.finaliseTransport(
        transportId,
        password
      );
    } else {
      transaction = this.contract.methods.finaliseTransport(transportId);
    }
    return new Transaction<{
      TransportStatus: TransportStatusEvent;
    }>(transaction, this.fromAddress);
  }
  /**
   * Get a transport by id
   * @param transportId Transport id
   * @returns Transport data
   */
  async getById(transportId: number): Promise<ITransport> {
    const transport: ITransport = await this.contract.methods
      .transports(transportId)
      .call();
    transport.batchIds = await this.getBatchIds(transportId);
    return transport;
  }
  /**
   * Get transport batches
   * @param transportId Transport id
   * @returns Transport batches
   */
  async getBatchIds(transportId: number): Promise<number[]> {
    const batchIds = await this.contract.methods
      .getTransportBatchids(transportId)
      .call();
    return batchIds;
  }
  /**
   * Get all transports
   * @param options Fetch filters
   * @param options.sender The sender of the transport
   * @param options.receiver The receiver of the transport
   * @param options.transportCompany The tranport company associated with this transport
   * @returns Fetched transports
   */
  async all(
    options: {
      sender?: string;
      receiver?: string;
      transportCompany?: string;
    } = {}
  ): Promise<ITransport[]> {
    const { sender, receiver, transportCompany } = options;
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
  /**
   * Get all status events from a transport
   * @param transportId Transport id
   * @returns Transport status events
   */
  async getStatusEvents(transportId: number): Promise<TransportStatusEvent[]> {
    const events = await this.getPastEvents<TransportStatusEvent>(
      'TransportStatus',
      {
        transportId,
      }
    );
    return events;
  }
}
export { Transport };
