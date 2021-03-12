import { createSlice } from '@reduxjs/toolkit';
import { fetchMaterials } from './actions';
import initialState from './initialState';

export const MaterialSlice = createSlice({
  name: 'material',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(fetchMaterials.fulfilled, (state, { payload }) => {});
  },
});

export const {} = MaterialSlice.actions;
export default MaterialSlice.reducer;
