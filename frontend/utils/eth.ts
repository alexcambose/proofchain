import * as bip39 from 'bip39';
// @ts-ignore
import { hdkey } from 'ethereumjs-wallet';

export const getPrivateKeyFromMnemonic = (mnemonic) => {
  const hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeedSync(mnemonic));
  const wallet_hdpath = "m/44'/60'/0'/0/";

  const wallet = hdwallet.derivePath(wallet_hdpath + '0').getWallet();
  //@ts-ignore
  const privateKey = wallet.privKey.toString('hex');

  return privateKey;
};
