import {
  ICertificate,
  ICertificateInstance,
  ICompany,
  IMaterial,
} from 'interface';

export interface ICertificateStore {
  certificates: ICertificate[];
  companyCertificates: {
    certificate: ICertificate;
    certificateInstance: ICertificateInstance;
    certificateAssignmentHistory: any;
  }[];
  loadingCertificates: boolean;
  minimumStake: string;
  certificateInfo: {
    certificate: ICertificate;
    materialAdditionalInfo: [
      {
        material: IMaterial;
        certificateInstance: ICertificateInstance;
        assignEvent: any;
        assignTime: number;
      }
    ];
    companyAdditionalInfo: [
      {
        company: ICompany;
        certificateInstance: ICertificateInstance;
        assignEvent: any;
        assignTime: number;
      }
    ];
  };
  loadingCertificateInfo: boolean;
}
