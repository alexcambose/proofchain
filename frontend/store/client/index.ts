import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { refreshLogin } from '@store/user/actions';
import AuthManager from '@utils/auth/authManager';
import { HYDRATE } from 'next-redux-wrapper';
import Web3 from 'web3';
import { initWeb3Instance } from '../../web3Instance';
import { fetchGasPrice } from './actions';
import initialState from './initialState';
const hydrate = createAction(HYDRATE);

export const ClientSlice = createSlice({
  name: 'appication',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(refreshLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(fetchGasPrice.fulfilled, (state, { payload }) => {
      state.gasPrice = payload.gasPrice;
    });
  },
});

export const {} = ClientSlice.actions;
export default ClientSlice.reducer;
