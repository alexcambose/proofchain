import { isClient } from '@utils/next';
import config from 'config';
import proofchain, { initProofchain } from 'proofchain';
import Web3 from 'web3';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

let _web3Instance;

const initWeb3FromWallet = (wallet, password = 'password'): string => {
  _web3Instance = new Web3(
    new Web3.providers.HttpProvider(config.ethProvider.default.http)
  );

  const decrytedWallet = _web3Instance.eth.accounts.decrypt(wallet, password);
  _web3Instance.eth.accounts.wallet.add(decrytedWallet);
  return _web3Instance.eth.accounts.wallet[0].address;
};
const initWeb3 = () => {
  _web3Instance = new Web3(
    new Web3.providers.HttpProvider(config.ethProvider.default.http)
  );
  console.log('Init web3 as client');
};
const initWeb3FromMetamask = async (): Promise<string> => {
  const ethereum = window.ethereum;
  // @ts-ignore
  _web3Instance = new Web3(ethereum);
  try {
    await ethereum.send('eth_requestAccounts');
  } catch (e) {
    await MySwal.fire({
      title: e.message,
    });
  }
  return _web3Instance.givenProvider.selectedAddress;
};

export const initWeb3Instance = async (loginObject: {
  type?: 'metamask';
  wallet?: object;
}): Promise<string> => {
  if (!loginObject) {
    initWeb3();
    await initProofchain(_web3Instance);
    return;
  }
  const { type, wallet } = loginObject;
  if (isClient()) {
    // @ts-ignore
    window.web3 = () => _web3Instance;
    // @ts-ignore
    window.Web3 = Web3;
  }
  if (type === 'metamask') {
    const address = await initWeb3FromMetamask();
    console.log('Init with metamask', _web3Instance, address);
    await initProofchain(_web3Instance, address);
    return address;
  }
  console.log('Init with wallet');
  const address = await initWeb3FromWallet(wallet);
  await initProofchain(_web3Instance, address);
  return address;
};
const web3Instance = () => _web3Instance;
export default web3Instance;
