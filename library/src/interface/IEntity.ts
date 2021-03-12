import MinedTransaction from '../MinedTransaction';

export default interface IEntity {
  create(options: { [key: string]: any }): Promise<MinedTransaction>;
}
