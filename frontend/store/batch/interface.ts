import { IBatch, IMaterialInfo } from 'interface';

export interface IBatchStore {
  batches: IBatch[];
  loadingBatches: boolean;
  batchInfo: {
    batch: IBatch;
    materialsInfo: IMaterialInfo[];
    createdTimestamp: number;
  };
}
