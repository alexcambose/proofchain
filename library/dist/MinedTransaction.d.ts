import IMinedTransaction from './interface/IMinedTransaction';
declare class MinedTransaction<EmmitedEvents = {}> {
    protected transaction: IMinedTransaction<EmmitedEvents>;
    constructor(transaction: IMinedTransaction<EmmitedEvents>);
    /**
     * Events emitted by this transaction
     */
    get events(): EmmitedEvents;
    /**
     * Transaction hash
     */
    get transactionHash(): string;
}
export default MinedTransaction;
