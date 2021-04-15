import Web3 from 'web3';
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
class Transaction<EmmitedEvents = {}> {
  protected gasPrice: number = 0;
  /**
   * Transaction constructor
   * @param transactionInstance Web3 transaction instance
   * @param fromAddress The address from which the transaction will be sent
   */
  constructor(
    protected transactionInstance: ContractSendMethod,
    protected fromAddress: string,
    protected options: ITransactionOptions = {}
  ) {}
  /**
   * Estimages the gas needed to perform the transaction
   * @param options Transaction options
   * @returns Returns the gas needed to perform the transaction
   */
  async estimateGas(): Promise<number> {
    return await this.transactionInstance.estimateGas({
      from: this.fromAddress,
      value: this.options.value,
    });
  }
  async encodeAbi() {}
  async setGasPrice(gasInWei: number) {
    this.gasPrice = gasInWei;
  }
  /**
   * Sends the transaction
   * @param options Send options
   * @returns Transaction result
   */
  async send(): Promise<MinedTransaction<EmmitedEvents>> {
    let additionalOptions: {
      gasPrice?: string;
    } = {};
    if (this.gasPrice) {
      additionalOptions.gasPrice = String(this.gasPrice);
    }
    const result = await this.transactionInstance.send({
      from: this.fromAddress,
      gas: await this.estimateGas(),
      value: this.options.value,
      ...additionalOptions,
    });
    //@ts-ignore
    return new MinedTransaction<EmmitedEvents>(result);
  }
}
export { Transaction };
