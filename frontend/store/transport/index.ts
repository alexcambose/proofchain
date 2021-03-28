import { createAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { fetchTransports, fetchYourTransports } from './actions';
import initialState from './initialState';

export const TransportSlice = createSlice({
  name: 'appication',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    [fetchTransports, fetchYourTransports].forEach((action) => {
      builder.addCase(action.pending, (state, { payload }) => {
        state.loadingTransports = true;
      });
      builder.addCase(action.fulfilled, (state, { payload }) => {
        state.loadingTransports = false;
        console.log(payload);
        state.transports = payload.transports;
      });
    });
  },
});

export const {} = TransportSlice.actions;
export default TransportSlice.reducer;
