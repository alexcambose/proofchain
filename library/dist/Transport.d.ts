import { Base } from './Base';
import IEmittedEvent from './interface/IEmittedEvent';
import { Transaction } from './Transaction';
export declare enum TransportStatusEnum {
    /**
     * Transport has no status set. It was just created
     */
    NONE = 0,
    /**
     * Transport is ready for transit
     */
    READY_FOR_TRANSIT = 1,
    /**
     * Transport is awaiting transit.
     */
    PENDING_TRANSIT = 2,
    /**
     * Transport is in transit
     */
    IN_TRANSIT = 3,
    /**
     * Transport is pending to be finalised
     */
    PENDING_FINALISED = 4,
    /**
     * Transport is finalised
     */
    FINALISED = 5
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
export declare type TransportCreatedEvent = {
    sender: string;
    receiver: string;
    transportCompany: string;
    transportId: number;
    event: IEmittedEvent;
};
export declare type TransportStatusEvent = {
    transportId: number;
    status: TransportStatusEnum;
    event: IEmittedEvent;
};
declare class Transport extends Base {
    TransportStatusEnum: typeof TransportStatusEnum;
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
    }): Transaction<{
        TransportCreated: TransportCreatedEvent;
    }>;
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
    }): Transaction<{
        TransportStatus: TransportStatusEvent;
    }>;
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
    }): Transaction<{
        TransportStatus: TransportStatusEvent;
    }>;
    /**
     * Get a transport by id
     * @param transportId Transport id
     * @returns Transport data
     */
    getById(transportId: number): Promise<ITransport>;
    /**
     * Get transport batches
     * @param transportId Transport id
     * @returns Transport batches
     */
    getBatchIds(transportId: number): Promise<number[]>;
    /**
     * Get all transports
     * @param options Fetch filters
     * @param options.sender The sender of the transport
     * @param options.receiver The receiver of the transport
     * @param options.transportCompany The tranport company associated with this transport
     * @returns Fetched transports
     */
    all(options?: {
        sender?: string;
        receiver?: string;
        transportCompany?: string;
    }): Promise<ITransport[]>;
    /**
     * Get all status events from a transport
     * @param transportId Transport id
     * @returns Transport status events
     */
    getStatusEvents(transportId: number): Promise<TransportStatusEvent[]>;
}
export { Transport };
