import { IMaterialStore } from './interface';

const initialState: IMaterialStore = {
  materials: [],
  rawMaterials: [],
  loadingRawMaterials: false,
  loadingMaterials: false,
};

export default initialState;
