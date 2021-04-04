import Base from './Base';
import MinedTransaction from './MinedTransaction';
import { EMPTY_ADDRESS } from './utils/eth';
interface IBatch {
  batchId?: number;
  code: string;
  materialTokenId: number;
  materialsUuid: number[];
  owner?: string;
}
type BatchCreateEvent = {
  company: string; // address
  batchId: number;
};
type BatchTransferEvent = {
  from: string;
  to: string;
  batchId: number;
  uuid: number;
};
type CreateTransactionEvents = {
  BatchCreate: BatchCreateEvent;
};
class Batch extends Base {
  async create({
    code,
    materialsUuid,
  }: {
    code: string;
    materialsUuid: number[];
  }): Promise<MinedTransaction<CreateTransactionEvents>> {
    await this.ensureContract();
    const transaction = await this.contract.methods
      .createBatch(code, materialsUuid)
      .send({ from: this.fromAddress, gas: 500000 });
    return new MinedTransaction<CreateTransactionEvents>(transaction);
  }
  async burn({
    batchId,
    materialsUuid,
  }: {
    batchId: number;
    materialsUuid: number[];
  }) {
    await this.ensureContract();
    const transaction = await this.contract.methods
      .burnBatchTokens(batchId, materialsUuid)
      .send({ from: this.fromAddress, gas: 300000 });
  }
  async getById(batchId: number, full: boolean = true): Promise<IBatch | null> {
    await this.ensureContract();

    const batch = await this.contract.methods.batch(batchId).call();
    if (batch.owner == EMPTY_ADDRESS) return null;
    if (full) {
      batch.materialsUuid = await this.contract.methods
        .getBatchMaterialsUuid(batch.batchId)
        .call();
    }

    return batch;
  }
  async allBatchIds(onlyExistingBatches = true): Promise<number[]> {
    await this.ensureContract();
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
  async all(onlyExistingBatches = true) {
    await this.ensureContract();
    const batchIds = await this.allBatchIds(onlyExistingBatches);
    let batches = [];
    for (let batchId of batchIds) {
      const fetchedBatch = await this.getById(batchId);
      batches.push(fetchedBatch);
    }
    return batches;
  }
  async remove(batchId: number): Promise<any> {
    await this.ensureContract();
    await this.contract.methods
      .removeBatchFromAddress(batchId)
      .send({ from: this.fromAddress, gas: 300000 });
  }
  async destroyBatch(
    batchId: number
  ): Promise<MinedTransaction<BatchTransferEvent>> {
    await this.ensureContract();
    const transaction = await this.contract.methods
      .destroyBatch(batchId)
      .send({ from: this.fromAddress, gas: 300000 });

    return new MinedTransaction<BatchTransferEvent>(transaction);
  }
}
export default Batch;
