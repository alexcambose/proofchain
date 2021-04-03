import { ICompany, IMaterial, IMaterialInfo } from 'interface';

export interface IClient {
  materialUuid: string;
  information: {
    company: ICompany;
    materialInstance: IMaterialInfo;
    material: IMaterial;
  };
}
