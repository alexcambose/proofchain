import { ContractSendMethod } from 'web3-eth-contract';
import MinedTransaction from './MinedTransaction';
export interface ITransactionOptions {
    /**
     * Transaction value in wei
     */
    value?: string;
}
/**
 * Transaction class. Used as an additional layer of abstractisation
 */
declare class Transaction<EmmitedEvents = {}> {
    protected transactionInstance: ContractSendMethod;
    protected fromAddress: string;
    protected options: ITransactionOptions;
    protected gasPrice: number;
    /**
     * Transaction constructor
     * @param transactionInstance Web3 transaction instance
     * @param fromAddress The address from which the transaction will be sent
     */
    constructor(transactionInstance: ContractSendMethod, fromAddress: string, options?: ITransactionOptions);
    /**
     * Estimages the gas needed to perform the transaction
     * @param options Transaction options
     * @returns Returns the gas needed to perform the transaction
     */
    estimateGas(): Promise<number>;
    encodeAbi(): Promise<void>;
    setGasPrice(gasInWei: number): Promise<void>;
    /**
     * Sends the transaction
     * @param options Send options
     * @returns Transaction result
     */
    send(): Promise<MinedTransaction<EmmitedEvents>>;
}
export { Transaction };
