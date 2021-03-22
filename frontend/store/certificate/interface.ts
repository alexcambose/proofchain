import { ICertificate, ICertificateInstance, IMaterial } from 'interface';

export interface ICertificateStore {
  certificates: ICertificate[];
  loadingCertificates: boolean;
  minimumStake: string;
  certificateInfo: {
    certificate: ICertificate;
    materials: [
      {
        material: IMaterial;
        certificateInstance: ICertificateInstance;
      }
    ];
  };
  loadingCertificateInfo: boolean;
}
