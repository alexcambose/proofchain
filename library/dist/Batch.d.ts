import { Base } from './Base';
import { Transaction } from './Transaction';
export interface IBatch {
    /**
     * Batch id
     */
    batchId?: number;
    /**
     * Batch code
     */
    code: string;
    /**
     * Material token that represents this batch
     */
    materialTokenId: number;
    /**
     * Materials uuid that are in this match
     */
    materialsUuid: number[];
    /**
     * Batch owner address
     */
    owner?: string;
}
export declare type BatchCreateEvent = {
    company: string;
    batchId: number;
    uuids: number[];
};
export declare type BatchTransferEvent = {
    from: string;
    to: string;
    batchId: number;
    uuid: number;
    transportId: number;
};
export declare type CreateTransactionEvents = {
    BatchCreate: BatchCreateEvent;
};
export declare class Batch extends Base {
    /**
     * Create a new batch
     * @param options Batch create options
     * @returns Batch create event
     */
    create(options: {
        code: string;
        materialsUuid: number[];
    }): Transaction<CreateTransactionEvents>;
    /**
     * Burn batch material uuid
     * @param options Burn options
     * @param options.batchId The id of the batch
     * @param options.materialsUuid The uuids of the materials to be burned
     * @returns Burn event
     */
    burn(options: {
        batchId: number;
        materialsUuid: number[];
    }): Transaction;
    /**
     * Get batch by id
     * @param batchId Batch id
     * @param full Instead of return materials uuid, it will return the material instance details
     * @returns Batch informations
     */
    getById(batchId: number, full?: boolean): Promise<IBatch | null>;
    /**
     * Get all batch ids
     * @param onlyExistingBatches If set to true it will return only the batches owned by "fromAddress"
     * @returns Batch ids
     */
    allBatchIds(onlyExistingBatches?: boolean): Promise<number[]>;
    /**
     * Get all batches
     * @param onlyExistingBatches If set to true it will return only the batches owned by "fromAddress"
     * @returns Batches details
     */
    all(onlyExistingBatches?: boolean): Promise<(IBatch | null)[]>;
    /**
     * Remove a batch (burn)
     * @param batchId The id of the batch
     * @returns
     */
    remove(batchId: number): Transaction;
    /**
     * Destory batch and add existing materials to users balance
     * @param batchId Target batch id
     *
     */
    destroyBatch(batchId: number): Transaction<BatchTransferEvent>;
}
