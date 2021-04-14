import MinedTransaction from '../MinedTransaction';
import { Transaction } from '../Transaction';

export default interface IEntity {
  create(options: { [key: string]: any }): Transaction;
}
