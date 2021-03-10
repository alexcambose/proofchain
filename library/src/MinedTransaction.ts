import IMinedTransaction from './interface/IMinedTransaction';

class MinedTransaction<EmmitedEvents = {}> {
  constructor(protected tx: IMinedTransaction<EmmitedEvents>) {}
  get events(): EmmitedEvents {
    return this.tx.events;
  }
}
export default MinedTransaction;
