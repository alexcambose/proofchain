import {
  ICertificateInstance,
  IMaterial,
  IMaterialInfo,
  ICertificateAuthority,
  IMaterialTransfer,
  ICertificate,
} from 'interface';

export interface IMaterialStore {
  materials?: IMaterial[];
  rawMaterials?: IMaterial[];
  loadingRawMaterials?: boolean;
  loadingMaterials?: boolean;
  materialInfo: {
    balance: number;
    material: IMaterial;
    transfers: IMaterialTransfer[];
    inventory: IMaterialInfo[];
    certificates: [
      {
        certificate: ICertificate;
        certificateInstance: ICertificateInstance;
        certificateAuthority: ICertificateAuthority;
        assignEvent: any;
        assignTimestamp: number;
      }
    ];
  };
}
