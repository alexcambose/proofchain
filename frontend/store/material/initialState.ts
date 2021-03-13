import { IMaterialStore } from './interface';

const initialState: IMaterialStore = {
  materials: [],
  rawMaterials: [],
  loadingRawMaterials: false,
};

export default initialState;
