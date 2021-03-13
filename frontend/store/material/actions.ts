import { createAsyncThunk } from '@reduxjs/toolkit';
import transactionWrapper from '@utils/transactionWrapper';
import proofchain from 'proofchain';

export const fetchMaterials = createAsyncThunk(
  'material/fetchMaterials',
  async () => {
    // const { entityType, name } = await proofchain().company.getCompany();
    // return { name, entityType };
  }
);
export const createMaterial = createAsyncThunk(
  'material/createMaterial',
  async ({ name, code }: { name: string; code: string }) => {
    const result = await transactionWrapper(
      async () => await proofchain().material.create({ name, code, images: [] })
    );
    console.log(result);
    return {};
  }
);
