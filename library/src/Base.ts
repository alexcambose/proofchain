import { Aggregator } from './abi';
import Web3 from 'web3';
import { parseEvent } from './utils/eventsParser';
import IEmittedEvent from './interface/IEmittedEvent';
import { EMPTY_ADDRESS } from './utils/eth';

export type BaseContracts =
  | 'companyContract'
  | 'materialContract'
  | 'certificateAuthorityManagerContract';

export abstract class Base {
  contract: any = null;
  constructor(
    protected web3: Web3,
    private _fromAddress: string,
    protected factoryContract: any,
    protected contractName: BaseContracts,
    protected contractAbi: any[]
  ) {}

  get fromAddress() {
    if (this._fromAddress !== EMPTY_ADDRESS) return this._fromAddress;
    throw new Error(`fromAddress parameter not specified`);
  }
  async getContractAddress() {
    const aggregatorContractAddress = await this.factoryContract.methods
      .aggregator()
      .call();
    const aggregatorContract = new this.web3.eth.Contract(
      // @ts-ignore
      Aggregator,
      aggregatorContractAddress
    );
    return aggregatorContract.methods[this.contractName + 'Address']().call();
  }

  async ensureContract() {
    // if the contract isn't set
    if (!this.contract) {
      this.contract = new this.web3.eth.Contract(
        this.contractAbi,
        await this.getContractAddress()
      );
      return this.contract;
    }
    // if the contract is already set
    return this.contract;
  }
  async getRawPastEvents(
    eventName: string,
    filter: object = {}
  ): Promise<IEmittedEvent[]> {
    await this.ensureContract();
    const events = await this.contract.getPastEvents(eventName, {
      filter,
      fromBlock: 0,
      toBlock: 'latest',
    });
    return events;
  }
  async getPastEvents<T>(
    eventName: string,
    filter: object = {},
    includeBlockData: boolean = false
  ): Promise<T[]> {
    const events = await this.getRawPastEvents(eventName, filter);
    let parsedEvents = events.map(parseEvent).reverse();
    if (includeBlockData) {
      parsedEvents = await Promise.all(
        parsedEvents.map(async (e) => ({
          ...e,
          block: await this.web3.eth.getBlock(e.event.blockNumber),
        }))
      );
    }
    return parsedEvents;
  }
}
