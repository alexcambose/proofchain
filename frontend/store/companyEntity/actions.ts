import { createAsyncThunk } from '@reduxjs/toolkit';
import proofchain from 'proofchain';

export const fetchCompanyEntityInfo = createAsyncThunk(
  'companyEntity/fetchCompanyEntityInfo',
  async () => {
    const { entityType, name } = await proofchain().company().getCompany();
    return { name, entityType };
  }
);
