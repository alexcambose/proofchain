import { createAsyncThunk } from '@reduxjs/toolkit';
import transactionWrapper from '@utils/transactionWrapper';
import proofchain from 'proofchain';

export const fetchRawMaterials = createAsyncThunk(
  'material/fetchRawMaterials',
  async () => {
    const materials = await proofchain().material.all();
    console.log(materials);
    return { materials };
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
