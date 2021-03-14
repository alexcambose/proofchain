export interface IMaterial {
  materialTokenId: number;
  name: string;
  code: string;
  amountIdentifier: string;
  events?: {
    MaterialCreate: any;
  };
}
