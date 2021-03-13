import { IMaterial } from 'interface';

export interface IMaterialStore {
  materials?: IMaterial[];
  rawMaterials?: IMaterial[];
  loadingRawMaterials?: boolean;
}
