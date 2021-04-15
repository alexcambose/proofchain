import IMinedTransaction from './interface/IMinedTransaction';
import { parseTransactionEvents } from './utils/eventsParser';

class MinedTransaction<EmmitedEvents = {}> {
  constructor(protected transaction: IMinedTransaction<EmmitedEvents>) {}
  /**
   * Events emitted by this transaction
   */
  get events(): EmmitedEvents {
    return parseTransactionEvents<EmmitedEvents>(this.transaction.events);
  }
  /**
   * Transaction hash
   */
  get transactionHash() {
    return this.transaction.transactionHash;
  }
}
export default MinedTransaction;
