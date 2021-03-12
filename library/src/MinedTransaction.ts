import IMinedTransaction from './interface/IMinedTransaction';
import { parseTransactionEvents } from './utils/eventsParser';

class MinedTransaction<EmmitedEvents = {}> {
  constructor(protected transaction: IMinedTransaction<EmmitedEvents>) {}
  get events(): EmmitedEvents {
    return parseTransactionEvents<EmmitedEvents>(this.transaction.events);
  }
}
export default MinedTransaction;
