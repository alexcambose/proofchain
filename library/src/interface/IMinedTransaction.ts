import IEmittedEvent from './IEmittedEvent';

export default interface IMinedTransaction {
  transactionHash: string;
  from: string;
  to: string;
  gasUsed: number;
  events: {
    [key: string]: IEmittedEvent;
  };
}
