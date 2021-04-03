import { createSlice } from '@reduxjs/toolkit';
import { refreshLogin } from '@store/user/actions';
import {
  fetchCompanyInfo,
  fetchMaterialInfo,
  fetchMaterialInstanceInfo,
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
      state.information.company = payload.company;
    });
    builder.addCase(fetchMaterialInfo.fulfilled, (state, { payload }) => {
      state.information.materialInfo = payload.materialInfo;
    });
    builder.addCase(
      fetchMaterialInstanceInfo.fulfilled,
      (state, { payload }) => {
        console.log(payload);
        state.information.materialInstance = payload.materialInstance;
      }
    );
  },
});

export const {} = ClientSlice.actions;
export default ClientSlice.reducer;
