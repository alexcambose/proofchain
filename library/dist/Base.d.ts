import Web3 from 'web3';
import IEmittedEvent from './interface/IEmittedEvent';
declare type BaseContracts = 'companyContract' | 'materialContract' | 'certificateAuthorityManagerContract';
declare abstract class Base {
    protected web3: Web3;
    fromAddress: string;
    protected factoryContract: any;
    protected contractName: BaseContracts;
    protected contractAbi: any[];
    contract: any;
    constructor(web3: Web3, fromAddress: string, factoryContract: any, contractName: BaseContracts, contractAbi: any[]);
    getContractAddress(): Promise<any>;
    ensureContract(): Promise<any>;
    getRawPastEvents(eventName: string, filter?: object): Promise<IEmittedEvent[]>;
    getPastEvents<T>(eventName: string, filter?: object): Promise<T[]>;
}
export default Base;
