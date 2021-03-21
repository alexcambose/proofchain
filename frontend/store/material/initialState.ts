import { IMaterialStore } from './interface';

const initialState: IMaterialStore = {
  materials: [],
  rawMaterials: [],
  loadingRawMaterials: false,
  loadingMaterials: false,
  materialInfo: {
    material: null,
    balance: 0,
    transfers: [],
    inventory: [],
  },
};

export default initialState;
