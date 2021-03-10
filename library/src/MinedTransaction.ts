import IMinedTransaction from './interface/IMinedTransaction';
import TransactionEvent from './TransactionEvent';

class MinedTransaction {
  constructor(protected tx: IMinedTransaction) {}
  getEvents() {
    return new TransactionEvent(this.tx);
  }
}
export default MinedTransaction;
