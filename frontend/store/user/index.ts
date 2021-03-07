import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AuthManager from '@utils/auth/authManager';
import Web3 from 'web3';
import { initWeb3Instance } from '../../web3';
import {
  loginWithMetamask,
  loginWithMnemonic,
  loginWithTorus,
} from './actions';
import initialState from './initialState';
export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
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
    builder.addCase(loginWithMnemonic.fulfilled, (state, { payload }) => {
      const encrypted = new Web3().eth.accounts.encrypt(
        payload.privateKey,
        'password'
      );

      AuthManager.setInfo({ type: 'mnemonic', wallet: encrypted });
      state.loggedIn = true;
    });
  },
});

export const { logout, refreshLogin } = UserSlice.actions;
export default UserSlice.reducer;
