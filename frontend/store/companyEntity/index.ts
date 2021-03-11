import { createSlice } from '@reduxjs/toolkit';
import { fetchCompanyEntityInfo } from './actions';
import initialState from './initialState';

export const CompanyEntitySlice = createSlice({
  name: 'companyEntity',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(fetchCompanyEntityInfo.fulfilled, (state, { payload }) => {
      const { name, entityType } = payload;
      state.name = name;
      state.entityType = entityType;
    });
  },
});

export const {} = CompanyEntitySlice.actions;
export default CompanyEntitySlice.reducer;
