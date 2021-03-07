import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AuthManager from '@utils/auth/authManager';
import { HYDRATE } from 'next-redux-wrapper';
import Web3 from 'web3';
import { initWeb3Instance } from '../../web3Manager';
import {
  loginWithMetamask,
  loginWithMnemonic,
  loginWithTorus,
  refreshLogin,
} from './actions';
import initialState from './initialState';
const hydrate = createAction(HYDRATE);

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    logout: (state, action: PayloadAction<string>) => {
      state.loggedIn = false;
      AuthManager.clearInfo();
    },
  },
  extraReducers: {
    // had to google this for hours :( -> https://github.com/kirill-konshin/next-redux-wrapper/pull/295/files/1792221d7e792b917b63ccaf77f528fc13797ef3#diff-e5c99337b70249438cce35e58d28640fe7e4d0427b281532c163837649d989f9R22
    [hydrate]: (state, { payload }) => {
      for (let key of ['loggedIn']) {
        state[key] = payload[UserSlice.name][key];
      }
    },
    [loginWithMetamask.fulfilled]: (state, { payload }) => {
      AuthManager.setInfo({ type: 'metamask' });
      state.loggedIn = true;
    },
    [loginWithTorus.fulfilled]: (state, { payload }) => {
      const { privateKey } = payload;
      const encrypted = new Web3().eth.accounts.encrypt(privateKey, 'password');

      AuthManager.setInfo({ type: 'torus', wallet: encrypted });
      state.loggedIn = true;
    },
    [loginWithMnemonic.fulfilled]: (state, { payload }) => {
      console.log('[loginWithMnemonic.fulfilled]');
      const encrypted = new Web3().eth.accounts.encrypt(
        payload.privateKey,
        'password'
      );
      AuthManager.setInfo({ type: 'mnemonic', wallet: encrypted });
      console.log(AuthManager.getInfo());
      state.loggedIn = true;
    },
    [refreshLogin.fulfilled]: (state, { payload }) => {
      state.loggedIn = true;
      state.address = payload.address;
      console.log('object');
    },
  },
});

export const { logout, setLoggedIn } = UserSlice.actions;
export default UserSlice.reducer;
