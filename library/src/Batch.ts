import Base from './Base';
import MinedTransaction from './MinedTransaction';
interface IBatch {
  batchId?: number;
  code: string;
  materialTokenId: number;
  materialTokenAmount: number;
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
    materialTokenId,
    materialTokenAmount,
  }: IBatch): Promise<MinedTransaction<CreateTransactionEvents>> {
    await this.ensureContract();
    const transaction = await this.contract.methods
      .createBatch(code, materialTokenId, materialTokenAmount)
      .send({ from: this.fromAddress, gas: 300000 });
    return new MinedTransaction<CreateTransactionEvents>(transaction);
  }
  async burn({
    batchId,
    materialTokenAmount,
  }: {
    batchId: number;
    materialTokenAmount: number;
  }) {
    await this.ensureContract();
    const transaction = await this.contract.methods
      .burnBatchToken(batchId, materialTokenAmount)
      .send({ from: this.fromAddress, gas: 300000 });
  }
  async getById(batchId: number): Promise<IBatch> {
    const batch: IBatch = await this.contract.methods.batch(batchId).call();
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
