import { createAsyncThunk } from '@reduxjs/toolkit';
import { SocialLoginTypeEnum } from '@types/enums';
import { triggerLogin } from '@utils/auth/torus';
import { getPrivateKeyFromMnemonic } from '@utils/eth';

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
