import Web3 from 'web3';
interface IProofchainConfig {
  httpProvider: string;
  privateKey: string;
}
/**
 * Main class
 */
class Proofchain {
  web3: Web3;
  init({ httpProvider, privateKey }: IProofchainConfig) {
    this.web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    this.web3.eth.accounts.wallet.add(privateKey);
  }
  metamaskInit(web3Instance: Web3) {
    this.web3 = web3Instance;
  }
  company() {}
  certificateAuthority() {}
}
export default new Proofchain();
