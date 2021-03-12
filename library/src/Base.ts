import { Aggregator } from './abi';
import Web3 from 'web3';

type BaseContracts =
  | 'companyContract'
  | 'materialContract'
  | 'certificateAuthorityManagerContract';

abstract class Base {
  contract: any = null;
  constructor(
    protected web3: Web3,
    protected fromAddress: string,
    protected factoryContract: any,
    protected contractName: BaseContracts,
    protected contractAbi: any[]
  ) {}
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
}

export default Base;
