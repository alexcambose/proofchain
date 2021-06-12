import * as bip39 from 'bip39';
// @ts-ignore
import { hdkey } from 'ethereumjs-wallet';
import Web3 from 'web3';

export const getAccountFromMnemonic = async (
  mnemonic,
  derivationPath = "m/44'/60'/0'/0/0"
) => {
  // create seed from mnemonic phrase
  const seed = await bip39.mnemonicToSeed(mnemonic);
  // initilize HD Wallet
  const hdwallet = hdkey.fromMasterSeed(seed);
  // generate wallet from seed and derivation path
  const wallet = hdwallet.derivePath(derivationPath).getWallet();
  // get private key
  //@ts-ignore
  const privateKey = wallet.privKey.toString('hex');
  // generate web3js account object with private key
  return new Web3().eth.accounts.privateKeyToAccount(privateKey);
};

export const shortenAddress = (
  address: string = '',
  offset: number = 6
): string =>
  address.substring(0, offset) +
  '...' +
  address.substring(address.length - offset, address.length - 1);
export const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';
export const EMPTY_66 =
  '0x0000000000000000000000000000000000000000000000000000000000000000';
