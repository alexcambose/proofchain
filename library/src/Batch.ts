import { Base } from './Base';
import MinedTransaction from './MinedTransaction';
import { Transaction } from './Transaction';
import { EMPTY_ADDRESS } from './utils/eth';
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
export type BatchCreateEvent = {
  company: string; // address
  batchId: number;
  uuids: number[];
};
export type BatchTransferEvent = {
  from: string;
  to: string;
  batchId: number;
  uuid: number;
  transportId: number;
};
export type CreateTransactionEvents = {
  BatchCreate: BatchCreateEvent;
};
export class Batch extends Base {
  /**
   * Create a new batch
   * @param options Batch create options
   * @returns Batch create event
   */
  create(options: {
    code: string;
    materialsUuid: number[];
  }): Transaction<CreateTransactionEvents> {
    const { code, materialsUuid } = options;
    const transaction = this.contract.methods.createBatch(code, materialsUuid);
    return new Transaction<CreateTransactionEvents>(
      transaction,
      this.fromAddress
    );
  }
  /**
   * Burn batch material uuid
   * @param options Burn options
   * @param options.batchId The id of the batch
   * @param options.materialsUuid The uuids of the materials to be burned
   * @returns Burn event
   */
  burn(options: { batchId: number; materialsUuid: number[] }): Transaction {
    const { batchId, materialsUuid } = options;
    const transaction = this.contract.methods.burnBatchTokens(
      batchId,
      materialsUuid
    );
    return new Transaction(transaction, this.fromAddress);
  }
  /**
   * Get batch by id
   * @param batchId Batch id
   * @param full Instead of return materials uuid, it will return the material instance details
   * @returns Batch informations
   */
  async getById(batchId: number, full: boolean = true): Promise<IBatch | null> {
    const batch = await this.contract.methods.batch(batchId).call();
    if (batch.owner == EMPTY_ADDRESS) return null;
    if (full) {
      batch.materialsUuid = await this.contract.methods
        .getBatchMaterialsUuid(batch.batchId)
        .call();
    }

    return batch;
  }
  /**
   * Get all batch ids
   * @param onlyExistingBatches If set to true it will return only the batches owned by "fromAddress"
   * @returns Batch ids
   */
  async allBatchIds(onlyExistingBatches = true): Promise<number[]> {
    const createEvents = await this.getPastEvents<BatchCreateEvent>(
      'BatchCreate',
      { company: this.fromAddress }
    );
    const transferEvents = await this.getPastEvents<BatchTransferEvent>(
      'BatchTransfer',
      { to: this.fromAddress, uuid: 0 }
    );
    const ids = (
      await Promise.all(
        [...createEvents, ...transferEvents]
          .map((e) => e.batchId)
          .map(async (e) => {
            if (onlyExistingBatches) {
              const exists = await this.contract.methods
                .getAddressBatches(this.fromAddress, e)
                .call();
              if (exists) return e;
            } else {
              return e;
            }
          })
      )
    ).filter((e) => e);
    // @ts-ignore
    return ids;
  }
  /**
   * Get all batches
   * @param onlyExistingBatches If set to true it will return only the batches owned by "fromAddress"
   * @returns Batches details
   */
  async all(onlyExistingBatches = true) {
    const batchIds = await this.allBatchIds(onlyExistingBatches);
    let batches = [];
    for (let batchId of batchIds) {
      const fetchedBatch = await this.getById(batchId);
      batches.push(fetchedBatch);
    }
    return batches;
  }
  /**
   * Remove a batch (burn)
   * @param batchId The id of the batch
   * @returns
   */
  remove(batchId: number): Transaction {
    const transaction = this.contract.methods.removeBatchFromAddress(batchId);
    return new Transaction(transaction, this.fromAddress);
  }
  /**
   * Destory batch and add existing materials to users balance
   * @param batchId Target batch id
   *
   */
  destroyBatch(batchId: number): Transaction<BatchTransferEvent> {
    const transaction = this.contract.methods.destroyBatch(batchId);

    return new Transaction<BatchTransferEvent>(transaction, this.fromAddress);
  }
}
