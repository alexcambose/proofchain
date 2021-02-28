import config from 'config';
import Web3 from 'web3';

let web3Instance;

const initWeb3FromWallet = (wallet, password = 'password'): string => {
  web3Instance = new Web3(
    new Web3.providers.HttpProvider(config.ethProvider.ropsten.http)
  );
  const decrytedWallet = web3Instance.eth.accounts.decrypt(wallet, password);
  web3Instance.eth.accounts.wallet.add(decrytedWallet);
  return web3Instance.eth.accounts.wallet[0];
};

const initWeb3FromMetamask = async (): Promise<string> => {
  const ethereum = window.ethereum;
  web3Instance = new Web3(ethereum);
  await ethereum.send('eth_requestAccounts');
  return web3Instance.givenProvider.selectedAddress;
};

export const initWeb3Instance = async (loginObject): Promise<string> => {
  const { type, wallet } = loginObject;
  // @ts-ignore
  window.web3 = web3Instance;
  if (type === 'metamask') {
    return initWeb3FromMetamask();
  } else {
    return initWeb3FromWallet(wallet);
  }
};
export default web3Instance;
