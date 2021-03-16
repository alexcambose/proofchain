import Base from './Base';
import MinedTransaction from './MinedTransaction';
interface IBatch {
    batchId?: number;
    code: string;
    materialTokenId: number;
    materialTokenAmount: number;
}
declare type BatchCreateEvent = {
    company: string;
    batchId: number;
};
declare type CreateTransactionEvents = {
    BatchCreate: BatchCreateEvent;
};
declare class Batch extends Base {
    create({ code, materialTokenId, materialTokenAmount, }: IBatch): Promise<MinedTransaction<CreateTransactionEvents>>;
    burn({ batchId, materialTokenAmount, }: {
        batchId: number;
        materialTokenAmount: number;
    }): Promise<void>;
    getById(batchId: number): Promise<IBatch>;
    all(): Promise<IBatch[]>;
}
export default Batch;
