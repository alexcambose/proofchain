import { createAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { fetchTransports } from './actions';
import initialState from './initialState';
const hydrate = createAction(HYDRATE);

export const TransportSlice = createSlice({
  name: 'appication',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(fetchTransports.pending, (state, { payload }) => {
      state.loadingTransports = true;
    });
    builder.addCase(fetchTransports.fulfilled, (state, { payload }) => {
      state.loadingTransports = false;
      state.transports = payload.transports;
    });
  },
});

export const {} = TransportSlice.actions;
export default TransportSlice.reducer;
