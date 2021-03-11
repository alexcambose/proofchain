import config from 'config';
import proofchain, { initProofchain } from 'proofchain';
import Web3 from 'web3';

let web3Instance;

const initWeb3FromWallet = (wallet, password = 'password'): string => {
  web3Instance = new Web3(
    new Web3.providers.HttpProvider(config.ethProvider.ropsten.http)
  );

  const decrytedWallet = web3Instance.eth.accounts.decrypt(wallet, password);
  web3Instance.eth.accounts.wallet.add(decrytedWallet);
  return web3Instance.eth.accounts.wallet[0].address;
};

const initWeb3FromMetamask = async (): Promise<string> => {
  const ethereum = window.ethereum;
  // @ts-ignore
  web3Instance = new Web3(ethereum);
  await ethereum.send('eth_requestAccounts');
  return web3Instance.givenProvider.selectedAddress;
};

export const initWeb3Instance = async (loginObject): Promise<string> => {
  const { type, wallet } = loginObject;
  // @ts-ignore
  window.web3 = () => web3Instance;
  // @ts-ignore
  window.Web3 = Web3;
  if (type === 'metamask') {
    console.log('Init with metamask');
    const address = await initWeb3FromMetamask();
    initProofchain(web3Instance);
    return address;
  }
  console.log('Init with wallet');
  const address = await initWeb3FromWallet(wallet);
  initProofchain(web3Instance);
  return address;
};
export default () => web3Instance;
