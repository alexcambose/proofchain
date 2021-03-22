import { TransportStatusEnum } from '@enums';
import { number, string } from 'yup/lib/locale';

export interface ITransport {
  sender: string;
  receiver: string;
  transportCompany: string;
  batchIds: number[];
  value: string;
  status: TransportStatusEnum;
  hashedPassword: string;
}
export interface IMaterial {
  materialTokenId: number;
  name: string;
  code: string;
  amountIdentifier: string;
  recipeMaterialTokenId?: number[];
  recipeMaterialAmount?: number[];
  events?: {
    MaterialCreate: any;
  };
}
export interface IMaterialInfo {
  materialTokenId: number;
  uuid: number;
  fromBatchId: number[];
  batchMaterialsUuid: number[][];
  mintEvent: any;
}
export interface IMaterialTransfer {
  from: string;
  to: string;
  value: number;
  materialTokenId: number;
  hash: string;
  event: any;
}
export interface IBatch {
  batchId: number;
  code: string;
  materialTokenId: number;
  materialsUuid: number[];
  isValue: boolean;
  events?: {
    BatchCreate: any;
  };
}
export interface ICertificate {
  name: string;
  code: number;
  description: string;
  certificateAuthority: string;
  events?: {
    CertificateAuthorityCertificateCreated: any;
  };
}
interface ICertificateAuthority {
  name: string;
  disabled: boolean;
  owner: string;
  isValue: boolean;
}

export interface ICertificateInstance {
  code: number;
  time: number;
  stake: number;
}
