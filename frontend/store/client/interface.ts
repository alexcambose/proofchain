import { ICompany, IMaterial, IMaterialInfo } from 'interface';

export interface IClientStore {
  materialUuid: string;
  information: {
    company: ICompany;
    materialInstance: IMaterialInfo;
    material: IMaterial;
  };
}
