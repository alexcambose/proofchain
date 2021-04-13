export { CERTIFICATE_ASSIGNMENT_TYPE } from './Material';
export { CompanyEntityTypeEnum } from './enums';

import { Factory } from './abi';
import Web3 from 'web3';
import { Company } from './Company';
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

/**
 * Main class
 */
class Proofchain {
  private factoryContract;
  private web3: Web3;
  private fromAddress?: string;
  /**
   * Material class instance.
   */
  public material: Material;
  /**
   * Company class instance.
   */
  public company: Company;
  /**
   * Batch class instance.
   */
  public batch: Batch;
  /**
   * Transport class instance.
   */
  public transport: Transport;
  /**
   * CertificateAuthority class instance.
   */
  public certificateAuthority: CertificateAuthority;
  /**
   * Proofchain constructor function
   *
   * @param options       An object containing proofchain configuration parameters
   * @param options.web3  The web3 instance used to execute transactions. Must have a provider. See {@link https://web3js.readthedocs.io/|Web3.js}
   * @param options.factoryContractAddress  The address of Factory.sol
   * @param options.fromAddress  The address from which smart contract interaction will be done.
   */
  private constructor(options: {
    web3: Web3;
    factoryContractAddress: string;
    fromAddress?: string;
  }) {
    const { web3, factoryContractAddress, fromAddress } = options;
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
  }: {
    httpProvider: string;
    privateKey: string;
    factoryContractAddress: string;
  }): Proofchain {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    web3.eth.accounts.wallet.add(privateKey);
    return new Proofchain({
      web3,
      factoryContractAddress,
      fromAddress: web3.eth.accounts.wallet[0].address,
    });
  }
  /**
   * Creates a new proofchain instance. Similar to web3Init.
   * @see {@link web3Init}
   *
   * @param options       An object containing proofchain configuration parameters
   * @param options.web3Provider  Web3 provider. See {@link https://web3js.readthedocs.io/en/v1.3.4/web3-eth.html#providers|Web3.js}
   * @param options.factoryContractAddress  The address of Factory.sol
   * @param options.fromAddress  The address from which smart contract interaction will be done.
   * @returns Proofchain instance
   */
  static providerInit(options: {
    web3Provider: any;
    factoryContractAddress: string;
    fromAddress?: string;
  }): Proofchain {
    const { web3Provider, factoryContractAddress, fromAddress } = options;
    const web3 = new Web3(web3Provider);
    return this.web3Init({ web3, factoryContractAddress, fromAddress });
  }
  /**
   * Creates a new proofchain instance
   *
   * @param options  An object containing proofchain configuration parameters
   * @param options.web3  The web3 instance used to execute transactions. Must have a provider. See {@link https://web3js.readthedocs.io/|Web3.js}
   * @param options.factoryContractAddress  The address of Factory.sol
   * @param options.fromAddress  The address from which smart contract interaction will be done.
   * @returns Proofchain instance
   */
  static web3Init(options: {
    web3: any;
    factoryContractAddress: string;
    fromAddress?: string;
  }): Proofchain {
    const { web3, factoryContractAddress, fromAddress } = options;
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
