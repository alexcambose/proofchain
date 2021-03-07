import * as bip39 from 'bip39';
// @ts-ignore
import { hdkey } from 'ethereumjs-wallet';

export const getPrivateKeyFromMnemonic = async (mnemonic) => {
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const hdwallet = hdkey.fromMasterSeed(seed);

  const wallet_hdpath = "m/44'/60'/0'/0/";

  const wallet = hdwallet.derivePath(wallet_hdpath + '0').getWallet();
  //@ts-ignore
  const privateKey = wallet.privKey.toString('hex');
  return privateKey;
};

export const shortenAddress = (address: string): string =>
  address.substring(0, 6) +
  '...' +
  address.substring(address.length - 6, address.length - 1);
