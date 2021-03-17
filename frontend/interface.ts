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
  materialTokenAmount: number;
  events?: {
    BatchCreate: any;
  };
}
