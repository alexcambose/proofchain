import { IBatch, ICertificate } from 'interface';

export interface ICertificateStore {
  certificates: ICertificate[];
  loadingCertificates: boolean;
}
