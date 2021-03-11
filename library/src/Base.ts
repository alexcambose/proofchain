import { Aggregator } from './abi';
import Web3 from 'web3';

class Base {
  contract: any = null;
  constructor(
    protected web3: Web3,
    protected fromAddress: string,
    protected factoryContract: any,
    protected contractName:
      | 'companyContract'
      | 'materialContract'
      | 'certificateAuthorityManagerContract'
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

  async ensureContract(abi: any) {
    if (!this.contract) {
      this.contract = new this.web3.eth.Contract(
        abi,
        await this.getContractAddress()
      );
      // also set default wallet address

      return this.contract;
    }
    return this.contract;
  }
}

export default Base;
