import { IMaterial } from 'interface';

export interface IMaterialStore {
  materials?: IMaterial[];
  rawMaterials?: IMaterial[];
  loadingRawMaterials?: boolean;
  loadingMaterials?: boolean;
  materialInfo: {
    balance: number;
    material: IMaterial;
  };
  loadingMaterialInfo: boolean;
}
