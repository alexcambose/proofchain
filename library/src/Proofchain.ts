import { Factory } from './abi';
import Web3 from 'web3';
import Company from './Company';
import {
  Company as CompanyAbi,
  Material as MaterialAbi,
  CertificateAuthorityManagerAbi,
} from './abi';
import Material from './Material';
import CertificateAuthority from './CertificateAuthority';
import Batch from './Batch';
import Transport from './Transport';
import { EMPTY_ADDRESS } from './utils/eth';

interface IProofchainConfig {
  factoryContractAddress: string;
}
/**
 * Main class
 */
class Proofchain {
  private factoryContract;
  private web3: Web3;
  private fromAddress?: string;
  public material: Material;
  public company: Company;
  public batch: Batch;
  public transport: Transport;
  public certificateAuthority: CertificateAuthority;
  constructor({
    web3,
    factoryContractAddress,
    fromAddress,
  }: {
    web3: Web3;
    factoryContractAddress: string;
    fromAddress?: string;
  }) {
    this.web3 = web3;
    this.factoryContract = new web3.eth.Contract(
      // @ts-ignore
      Factory,
      factoryContractAddress
    );
    this.fromAddress = fromAddress;
    this.company = new Company(
      this.web3,
      this.fromAddress || EMPTY_ADDRESS,
      this.factoryContract,
      'companyContract',
      CompanyAbi
    );
    this.material = new Material(
      this.web3,
      this.fromAddress || EMPTY_ADDRESS,
      this.factoryContract,
      'materialContract',
      MaterialAbi
    );
    this.certificateAuthority = new CertificateAuthority(
      this.web3,
      this.fromAddress || EMPTY_ADDRESS,
      this.factoryContract,
      'certificateAuthorityManagerContract',
      CertificateAuthorityManagerAbi
    );
    this.batch = new Batch(
      this.web3,
      this.fromAddress || EMPTY_ADDRESS,
      this.factoryContract,
      'materialContract',
      MaterialAbi
    );
    this.transport = new Transport(
      this.web3,
      this.fromAddress || EMPTY_ADDRESS,
      this.factoryContract,
      'companyContract',
      CompanyAbi
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
    return new Proofchain({
      web3,
      factoryContractAddress,
      fromAddress: web3.eth.accounts.wallet[0].address,
    });
  }
  static providerInit({
    web3Provider,
    factoryContractAddress,
    fromAddress,
  }: IProofchainConfig & {
    web3Provider: any;
    fromAddress?: string;
  }): Proofchain {
    const web3 = new Web3(web3Provider);
    return this.web3Init({ web3, factoryContractAddress, fromAddress });
  }
  static web3Init({
    web3,
    factoryContractAddress,
    fromAddress,
  }: IProofchainConfig & {
    web3: any;
    fromAddress?: string;
  }): Proofchain {
    return new Proofchain({
      web3,
      fromAddress,
      factoryContractAddress,
    });
  }
  isInitialised(): boolean {
    return !!this.web3;
  }
}
export default Proofchain;
