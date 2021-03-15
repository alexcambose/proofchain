import { IBatch } from 'interface';

export interface IBatchStore {
  batches: IBatch[];
  loadingBatches: boolean;
}
