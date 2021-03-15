import { createAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { fetchBatches } from './actions';
import initialState from './initialState';
const hydrate = createAction(HYDRATE);

export const BatchSlice = createSlice({
  name: 'appication',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(fetchBatches.pending, (state, { payload }) => {
      state.loadingBatches = true;
    });
    builder.addCase(fetchBatches.fulfilled, (state, { payload }) => {
      state.loadingBatches = false;
      state.batches = payload.batches;
    });
  },
});

export const {} = BatchSlice.actions;
export default BatchSlice.reducer;
