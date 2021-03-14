export interface IMaterial {
  materialTokenId: number;
  name: string;
  code: string;
  events?: {
    MaterialCreate: any;
  };
}
