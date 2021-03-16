import IMinedTransaction from './interface/IMinedTransaction';
declare class MinedTransaction<EmmitedEvents = {}> {
    protected transaction: IMinedTransaction<EmmitedEvents>;
    constructor(transaction: IMinedTransaction<EmmitedEvents>);
    get events(): EmmitedEvents;
    get transactionHash(): string;
}
export default MinedTransaction;
