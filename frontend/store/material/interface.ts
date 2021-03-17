import { IMaterial, IMaterialInfo, IMaterialTransfer } from 'interface';

export interface IMaterialStore {
  materials?: IMaterial[];
  rawMaterials?: IMaterial[];
  loadingRawMaterials?: boolean;
  loadingMaterials?: boolean;
  materialInfo: {
    balance: number;
    material: IMaterial;
    transfers: IMaterialTransfer[];
    inventory: IMaterialInfo[];
  };
  loadingMaterialInfo: boolean;
}
