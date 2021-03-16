export default interface IMinedTransaction<EmmitedEvents = {}> {
    transactionHash: string;
    from: string;
    to: string;
    gasUsed: number;
    events: EmmitedEvents;
}
