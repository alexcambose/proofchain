import Base from './Base';
import MinedTransaction from './MinedTransaction';
interface IBatch {
  batchId?: number;
  code: string;
  materialTokenId: number;
  materialsUuid: number[];
  isValue?: boolean;
}
type BatchCreateEvent = {
  company: string; // address
  batchId: number;
};
type CreateTransactionEvents = {
  BatchCreate: BatchCreateEvent;
};
class Batch extends Base {
  async create({
    code,
    materialsUuid,
  }: IBatch): Promise<MinedTransaction<CreateTransactionEvents>> {
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
    if (!batch.isValue) return null;
    if (full) {
      batch.materialsUuid = await this.contract.methods
        .getBatchMaterialsUuid(batch.batchId)
        .call();
    }

    return batch;
  }
  async all() {
    await this.ensureContract();
    const createEvents = await this.getPastEvents<BatchCreateEvent>(
      'BatchCreate',
      { company: this.fromAddress }
    );
    let batches = [];
    for (let createEvent of createEvents) {
      const fetchedBatch = await this.getById(createEvent.batchId);
      batches.push(fetchedBatch);
    }
    return batches;
  }
}
export default Batch;
