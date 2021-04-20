import {
  CertificateTypeEnum,
  CompanyEntityTypeEnum,
  TransportStatusEnum,
} from '@enums';
export interface ICompany {
  entityType: CompanyEntityTypeEnum;
  name: string;
  isValue: boolean;
}
export interface ITransport {
  transportId: number;
  sender: string;
  receiver: string;
  transportCompany: string;
  batchIds: number[];
  value: string;
  status: TransportStatusEnum;
  hashedPassword: string;

  events?: {
    TransportCreated: any;
  };
}
export interface IMaterial {
  materialTokenId: number;
  name: string;
  code: string;
  amountIdentifier: string;
  recipeMaterialTokenId?: number[];
  recipeMaterialAmount?: number[];
  creator: string;

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
  ctype: CertificateTypeEnum;
  events?: {
    CertificateAuthorityCertificateCreated: any;
  };
}
export interface ICertificateAuthority {
  name: string;
  disabled: boolean;
  owner: string;
  isValue: boolean;
}

export interface ICertificateInstance {
  code: number;
  stake: number;
}
