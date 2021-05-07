import Web3 from 'web3';
import IEmittedEvent from './interface/IEmittedEvent';
export declare type BaseContracts = 'companyContract' | 'materialContract' | 'certificateAuthorityManagerContract';
export declare abstract class Base {
    protected web3: Web3;
    private _fromAddress;
    protected factoryContract: any;
    protected contractName: BaseContracts;
    protected contractAbi: any[];
    contract: any;
    constructor(web3: Web3, _fromAddress: string, factoryContract: any, contractName: BaseContracts, contractAbi: any[]);
    get fromAddress(): string;
    getContractAddress(): Promise<any>;
    ensureContract(): Promise<any>;
    getRawPastEvents(eventName: string, filter?: object): Promise<IEmittedEvent[]>;
    getPastEvents<T>(eventName: string, filter?: object, includeBlockData?: boolean): Promise<T[]>;
}
