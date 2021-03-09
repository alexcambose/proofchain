import Web3 from 'web3';
interface IProofchainConfig {
  httpProvider: string;
  privateKey: string;
}
/**
 * Main class
 */
class Proofchain {
  constructor(private web3: Web3) {}
  static init({ httpProvider, privateKey }: IProofchainConfig): Proofchain {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    web3.eth.accounts.wallet.add(privateKey);
    return new Proofchain(web3);
  }
  static providerInit(web3Provider: any): Proofchain {
    return new Proofchain(new Web3(web3Provider));
  }
  isInitialised(): boolean {
    return !!this.web3;
  }
  company() {}
  certificateAuthority() {}
}
export default Proofchain;
