import { isClient } from '@utils/next';
import config from 'config';
import proofchain, { initProofchain } from 'proofchain';
import Web3 from 'web3';

let _clientWeb3Instance;
const initWeb3FromWallet = () => {
  _clientWeb3Instance = new Web3(
    new Web3.providers.HttpProvider(config.ethProvider.default.http)
  );
};
export const initClientWeb3Instance = async (): Promise<void> => {
  if (isClient()) {
    // @ts-ignore
    window.web3 = () => _clientWeb3Instance;
    // @ts-ignore
    window.Web3 = Web3;
  }
  console.log('Client web3 init');
  await initWeb3FromWallet();
  initProofchain(_clientWeb3Instance);
};
const clientWeb3Instance = () => _clientWeb3Instance;
export default clientWeb3Instance;
