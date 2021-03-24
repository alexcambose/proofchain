import { createSlice } from '@reduxjs/toolkit';
import { refreshLogin } from '@store/user/actions';
import {
  fetchMaterialInfo,
  fetchMaterialInfoCertificates,
  fetchMaterials,
  fetchRawMaterials,
  mintMaterial,
} from './actions';
import initialState from './initialState';

export const MaterialSlice = createSlice({
  name: 'material',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(mintMaterial.fulfilled, (state, { payload }) => {
      const { balance, materialTokenId, transfers } = payload;
      if (materialTokenId == state.materialInfo.material.materialTokenId) {
        state.materialInfo.balance = balance;
        state.materialInfo.transfers = transfers;
      }
    });
    builder.addCase(fetchMaterialInfo.fulfilled, (state, { payload }) => {
      state.materialInfo.material = payload.material;
      state.materialInfo.balance = payload.balance;
      state.materialInfo.transfers = payload.transfers;
      state.materialInfo.inventory = payload.inventory;
    });
    builder.addCase(fetchRawMaterials.fulfilled, (state, { payload }) => {
      state.rawMaterials = payload.materials;
      state.loadingRawMaterials = false;
    });
    builder.addCase(fetchRawMaterials.pending, (state, { payload }) => {
      state.loadingRawMaterials = true;
    });
    builder.addCase(fetchRawMaterials.rejected, (state, { payload }) => {
      state.loadingRawMaterials = false;
    });
    builder.addCase(fetchMaterials.fulfilled, (state, { payload }) => {
      state.materials = payload.materials;
      state.loadingMaterials = false;
    });
    builder.addCase(fetchMaterials.pending, (state, { payload }) => {
      state.loadingMaterials = true;
    });
    builder.addCase(fetchMaterials.rejected, (state, { payload }) => {
      state.loadingMaterials = false;
    });
    builder.addCase(
      fetchMaterialInfoCertificates.fulfilled,
      (state, { payload }) => {
        state.materialInfo.certificates = payload.certificates;
      }
    );
  },
});

export const {} = MaterialSlice.actions;
export default MaterialSlice.reducer;
