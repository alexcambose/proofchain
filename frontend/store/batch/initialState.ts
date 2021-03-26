import { IBatchStore } from './interface';

const initialState: IBatchStore = {
  batches: [],
  loadingBatches: false,
  batchInfo: {
    batch: null,
    materialsInfo: null,
    createdTimestamp: 0,
  },
};

export default initialState;
