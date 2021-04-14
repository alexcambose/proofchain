import Web3 from 'web3';
import { ContractSendMethod } from 'web3-eth-contract';
import MinedTransaction from './MinedTransaction';

/**
 * Transaction class. Used as an additional layer of abstractisation
 */
class Transaction<EmmitedEvents = {}> {
  /**
   * Transaction constructor
   * @param transactionInstance Web3 transaction instance
   * @param fromAddress The address from which the transaction will be sent
   */
  constructor(
    protected transactionInstance: ContractSendMethod,
    protected fromAddress: string
  ) {}
  /**
   * Estimages the gas needed to perform the transaction
   * @param options Transaction options
   * @returns Returns the gas needed to perform the transaction
   */
  async estimateGas(options: { value?: string } = {}): Promise<number> {
    const { value } = options;

    return await this.transactionInstance.estimateGas({
      from: this.fromAddress,
      value,
    });
  }
  async encodeAbi() {}
  /**
   * Sends the transaction
   * @param options Send options
   * @returns Transaction result
   */
  async send(
    options: {
      value?: string;
    } = {}
  ): Promise<MinedTransaction<EmmitedEvents>> {
    const { value } = options;
    const gas = await this.estimateGas();
    const result = await this.transactionInstance.send({
      from: this.fromAddress,
      gas: await this.estimateGas(),
      value,
    });
    //@ts-ignore
    return new MinedTransaction<EmmitedEvents>(result);
  }
}
export { Transaction };
