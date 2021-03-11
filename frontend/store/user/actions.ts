import { createAsyncThunk } from '@reduxjs/toolkit';
import { SocialLoginTypeEnum } from 'enums';
import AuthManager from '@utils/auth/authManager';
import { triggerLogin } from '@utils/auth/torus';
import { getPrivateKeyFromMnemonic } from '@utils/eth';
import web3Instance, { initWeb3Instance } from 'web3Instance';
import proofchain from 'proofchain';

export const loginWithMetamask = createAsyncThunk(
  'users/loginWithMetamask',
  async () => {
    await window.ethereum.send('eth_requestAccounts');
    return;
  }
);
export const loginWithTorus = createAsyncThunk(
  'users/loginWithTorus',
  // Declare the type your function argument here:
  async (loginType: SocialLoginTypeEnum) => {
    const result = await triggerLogin(loginType);
    return result;
  }
);
export const loginWithMnemonic = createAsyncThunk(
  'users/loginWithMnemonic',
  // Declare the type your function argument here:
  async (mnemonic: string) => {
    const privateKey = await getPrivateKeyFromMnemonic(mnemonic);
    return { privateKey };
  }
);

export const refreshLogin = createAsyncThunk(
  'users/refreshLogin',
  // Declare the type your function argument here:
  async () => {
    const address = await initWeb3Instance(AuthManager.getInfo());
    // const hasCompany = await proofchain().company().hasCompany();

    // console.log('refresh login', hasCompany);
    return { address };
  }
);
