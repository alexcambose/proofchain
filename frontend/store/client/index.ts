import { createSlice } from '@reduxjs/toolkit';
import { refreshLogin } from '@store/user/actions';
import {
  fetchCompanyInfo,
  fetchCompanyInfoCertificates,
  fetchMaterialInfo,
} from './actions';
import initialState from './initialState';

export const ClientSlice = createSlice({
  name: 'appication',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(refreshLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(fetchCompanyInfo.fulfilled, (state, { payload }) => {
      console.log(payload);

      state.information.companyInfo = payload;
    });
    builder.addCase(fetchMaterialInfo.fulfilled, (state, { payload }) => {
      state.information.materialInstance = payload.materialInstance;
      state.information.material = payload.material;
    });
    builder.addCase(
      fetchCompanyInfoCertificates.fulfilled,
      (state, { payload }) => {
        state.information.companyInfo.certificates = payload.certificates;
      }
    );
  },
});

export const {} = ClientSlice.actions;
export default ClientSlice.reducer;
