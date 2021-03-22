import { createAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { fetchCertificates } from './actions';
import initialState from './initialState';
const hydrate = createAction(HYDRATE);

export const CertificateSlice = createSlice({
  name: 'appication',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(fetchCertificates.pending, (state, { payload }) => {
      state.loadingCertificates = true;
    });
    builder.addCase(fetchCertificates.fulfilled, (state, { payload }) => {
      state.loadingCertificates = false;
      state.certificates = payload.certificates;
    });
  },
});

export const {} = CertificateSlice.actions;
export default CertificateSlice.reducer;
