import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { refreshLogin } from '@store/user/actions';
import AuthManager from '@utils/auth/authManager';
import { HYDRATE } from 'next-redux-wrapper';
import Web3 from 'web3';
import { initWeb3Instance } from '../../web3Instance';
import initialState from './initialState';
const hydrate = createAction(HYDRATE);

export const ApplicationSlice = createSlice({
  name: 'appication',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(hydrate, (state, { payload }) => {
      state.hydrated = true;
      console.log('app hydrate');
    });
    builder.addCase(refreshLogin.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(refreshLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
  },
});

export const {} = ApplicationSlice.actions;
export default ApplicationSlice.reducer;
