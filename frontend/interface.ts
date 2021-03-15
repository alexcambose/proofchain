export interface IMaterial {
  materialTokenId: number;
  name: string;
  code: string;
  amountIdentifier: string;
  recipeMaterialId?: number[];
  recipeMaterialAmount?: number[];
  events?: {
    MaterialCreate: any;
  };
}
