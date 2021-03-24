import { ICertificate, ICertificateInstance, IMaterial } from 'interface';

export interface ICertificateStore {
  certificates: ICertificate[];
  loadingCertificates: boolean;
  minimumStake: string;
  certificateInfo: {
    certificate: ICertificate;
    additionalInfo: [
      {
        material: IMaterial;
        certificateInstance: ICertificateInstance;
        assignEvent: any;
      }
    ];
  };
  loadingCertificateInfo: boolean;
}
