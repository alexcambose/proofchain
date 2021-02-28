import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPrivateKeyFromMnemonic } from '@utils/eth';
import initialState, { IUser, IUserData } from './initialState';
import { initWeb3Instance } from '../../web3';
import { loginWithMetamask, loginWithTorus } from './actions';
import AuthManager from '@utils/auth/authManager';
import Web3 from 'web3';
export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    loginWithMnemonic: (state, action: PayloadAction<string>) => {
      const mnemonic = action.payload;
      const privateKey = getPrivateKeyFromMnemonic(mnemonic);
      const encrypted = new Web3().eth.accounts.encrypt(privateKey, 'password');

      AuthManager.setInfo({ type: 'mnemonic', wallet: encrypted });
      state.loggedIn = true;
    },
    refreshLogin: (state) => {
      initWeb3Instance(AuthManager.getInfo());
      state.loggedIn = true;
    },
    logout: (state, action: PayloadAction<string>) => {
      state.loggedIn = false;
      AuthManager.clearInfo();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginWithMetamask.fulfilled, (state, { payload }) => {
      AuthManager.setInfo({ type: 'metamask' });
      state.loggedIn = true;
    });
    builder.addCase(loginWithTorus.fulfilled, (state, { payload }) => {
      const { privateKey } = payload;
      const encrypted = new Web3().eth.accounts.encrypt(privateKey, 'password');

      AuthManager.setInfo({ type: 'torus', wallet: encrypted });
      state.loggedIn = true;
    });
  },
});

export const { loginWithMnemonic, logout, refreshLogin } = UserSlice.actions;
export default UserSlice.reducer;
