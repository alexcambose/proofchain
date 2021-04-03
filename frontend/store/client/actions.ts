import { createAsyncThunk } from '@reduxjs/toolkit';
import proofchain from 'proofchain';

export const fetchCompanyInfo = createAsyncThunk(
  'client/fetchCompanyInfo',
  async (_, { getState }) => {
    // @ts-ignore
    const { creator } = getState().client.information.material;
    const company = await proofchain().company.getCompany(creator);
    return { company };
  }
);

export const fetchMaterialInfo = createAsyncThunk(
  'client/fetchMaterialInfo',
  async ({ uuid }: { uuid: number }) => {
    const materialInstance = await proofchain().material.getMaterialByUuid(
      uuid
    );
    const material = await proofchain().material.getById(uuid);
    return { material, materialInstance };
  }
);
