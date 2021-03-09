import { Factory } from '../src/abi';
import Web3 from 'web3';
import Company from './Company';
interface IProofchainConfig {
  factoryContractAddress: string;
}
/**
 * Main class
 */
class Proofchain {
  private factoryContract;
  private web3: Web3;
  constructor({
    web3,
    factoryContractAddress,
  }: {
    web3: Web3;
    factoryContractAddress: string;
  }) {
    this.web3 = web3;
    this.factoryContract = new web3.eth.Contract(
      // @ts-ignore
      Factory,
      factoryContractAddress
    );
  }
  static init({
    httpProvider,
    privateKey,
    factoryContractAddress,
  }: IProofchainConfig & {
    httpProvider: string;
    privateKey: string;
  }): Proofchain {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    web3.eth.accounts.wallet.add(privateKey);
    return new Proofchain({ web3, factoryContractAddress });
  }
  static providerInit({
    web3Provider,
    factoryContractAddress,
  }: IProofchainConfig & {
    web3Provider: any;
  }): Proofchain {
    return new Proofchain({
      web3: new Web3(web3Provider),
      factoryContractAddress,
    });
  }
  isInitialised(): boolean {
    return !!this.web3;
  }
  company(): Company {
    return new Company(this.web3, this.factoryContract, 'companyContract');
  }
  certificateAuthority() {}
}
export default Proofchain;
