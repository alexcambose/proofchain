import * as bip39 from 'bip39';
// @ts-ignore
import { hdkey } from 'ethereumjs-wallet';

export const getPrivateKeyFromMnemonic = async (
  mnemonic,
  derivationPath = "m/44'/60'/0'/0/0"
) => {
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const hdwallet = hdkey.fromMasterSeed(seed);

  const wallet = hdwallet.derivePath(derivationPath).getWallet();
  //@ts-ignore
  const privateKey = wallet.privKey.toString('hex');
  return privateKey;
};

export const shortenAddress = (
  address: string = '',
  offset: number = 6
): string =>
  address.substring(0, offset) +
  '...' +
  address.substring(address.length - offset, address.length - 1);
