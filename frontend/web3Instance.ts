import { isClient } from '@utils/next';
import config from 'config';
import proofchain, { initProofchain } from 'proofchain';
import Web3 from 'web3';

let _web3Instance;

const initWeb3FromWallet = (wallet, password = 'password'): string => {
  _web3Instance = new Web3(
    new Web3.providers.HttpProvider(config.ethProvider.default.http)
  );

  const decrytedWallet = _web3Instance.eth.accounts.decrypt(wallet, password);
  _web3Instance.eth.accounts.wallet.add(decrytedWallet);
  return _web3Instance.eth.accounts.wallet[0].address;
};

const initWeb3FromMetamask = async (): Promise<string> => {
  const ethereum = window.ethereum;
  // @ts-ignore
  _web3Instance = new Web3(ethereum);
  await ethereum.send('eth_requestAccounts');
  return _web3Instance.givenProvider.selectedAddress;
};

export const initWeb3Instance = async (loginObject): Promise<string> => {
  const { type, wallet } = loginObject;
  if (isClient()) {
    // @ts-ignore
    window.web3 = () => _web3Instance;
    // @ts-ignore
    window.Web3 = Web3;
  }
  if (type === 'metamask') {
    console.log('Init with metamask');
    const address = await initWeb3FromMetamask();
    initProofchain(_web3Instance, address);
    return address;
  }
  console.log('Init with wallet');
  const address = await initWeb3FromWallet(wallet);
  initProofchain(_web3Instance, address);
  return address;
};
const web3Instance = () => _web3Instance;
export default web3Instance;
