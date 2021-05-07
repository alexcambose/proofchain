import {
  ICertificate,
  ICertificateAuthority,
  ICertificateInstance,
  ICompany,
  IMaterial,
  IMaterialInfo,
} from 'interface';

export interface IClientStore {
  materialUuid: string;
  information: {
    companyInfo: {
      company: ICompany;
      createdEvent: any;
      certificates: [
        {
          certificate: ICertificate;
          certificateInstance: ICertificateInstance;
          certificateAuthority: ICertificateAuthority;
          assignEvent: any;
        }
      ];
    };
    materialInstance: IMaterialInfo;
    material: IMaterial;
  };
}
