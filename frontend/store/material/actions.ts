import { createAsyncThunk } from '@reduxjs/toolkit';
import proofchain from 'proofchain';

export const fetchMaterials = createAsyncThunk(
  'material/fetchMaterials',
  async () => {
    // const { entityType, name } = await proofchain().company.getCompany();
    // return { name, entityType };
  }
);
