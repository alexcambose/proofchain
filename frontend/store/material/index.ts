import { createSlice } from '@reduxjs/toolkit';
import { fetchRawMaterials } from './actions';
import initialState from './initialState';

export const MaterialSlice = createSlice({
  name: 'material',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
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
  },
});

export const {} = MaterialSlice.actions;
export default MaterialSlice.reducer;
