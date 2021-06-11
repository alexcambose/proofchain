import {
  AsyncThunk,
  createAction,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import builderRejectionHandler from '@store/builderRejectionHandler';
import AuthManager from '@utils/auth/authManager';
import { omit } from 'lodash';
import { HYDRATE } from 'next-redux-wrapper';
import Web3 from 'web3';
import { initWeb3Instance } from '../../web3Instance';
import {
  loginWithMetamask,
  loginWithMnemonic,
  loginWithTorus,
  refreshBalance,
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
      state.address = '';
      AuthManager.clearInfo();
    },
    setInitialData: (state, action: PayloadAction<any>) => {
      for (let key in action.payload) {
        state[key] = action.payload[key];
      }
    },
  },
  extraReducers: (builder: any) => {
    // had to google this for hours :( -> https://github.com/kirill-konshin/next-redux-wrapper/pull/295/files/1792221d7e792b917b63ccaf77f528fc13797ef3#diff-e5c99337b70249438cce35e58d28640fe7e4d0427b281532c163837649d989f9R22
    builder.addCase(hydrate, (state, { payload }) => {
      const payloadToHydrate = payload[UserSlice.name];
      // if the payload to hydrate has the address set, then it means it's a valid payload
      if (payload[UserSlice.name]['address']) {
        console.log(payloadToHydrate);

        for (let key in omit(payloadToHydrate, [
          'balance',
          'lastBalanceRefresh',
        ])) {
          state[key] = payload[UserSlice.name][key];
        }
      }
    });
    builder.addCase(loginWithMetamask.fulfilled, (state, { payload }) => {
      AuthManager.setInfo({ type: 'metamask' });
      state.loggedIn = true;
    });
    builder.addCase(loginWithMetamask.rejected, (state, { payload }) => {});
    builder.addCase(loginWithTorus.fulfilled, (state, { payload }) => {
      console.log(payload);
      const { privateKey, publicAddress } = payload;
      const encrypted = new Web3().eth.accounts.encrypt(privateKey, 'password');

      AuthManager.setInfo({ type: 'torus', wallet: encrypted });
      state.address = publicAddress;
      state.loggedIn = true;
    });
    builder.addCase(loginWithMnemonic.fulfilled, (state, { payload }) => {
      const encrypted = new Web3().eth.accounts.encrypt(
        payload.privateKey,
        'password'
      );
      AuthManager.setInfo({ type: 'mnemonic', wallet: encrypted });
      state.loggedIn = true;
      state.address = payload.address;
    });
    builder.addCase(refreshLogin.fulfilled, (state, { payload }) => {
      const { address, hasEntity, entityType, companyEntityType } = payload;
      state.loggedIn = true;
      state.address = address;
      state.hasEntity = hasEntity;
      state.entityType = entityType;
      state.companyEntityType = companyEntityType;
    });
    builder.addCase(refreshBalance.fulfilled, (state, { payload }) => {
      state.balance = payload.balance;
      state.lastBalanceRefresh = payload.lastBalanceRefresh;
      state.loadingBalance = false;
    });
    builder.addCase(refreshBalance.pending, (state, { payload }) => {
      state.loadingBalance = true;
    });
    builderRejectionHandler(builder);
  },
});

export const { logout, setLoggedIn, setInitialData } = UserSlice.actions;
export default UserSlice.reducer;
