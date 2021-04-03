import { createAsyncThunk } from '@reduxjs/toolkit';
import proofchain from 'proofchain';

export const fetchCompanyInfo = createAsyncThunk(
  'client/fetchCompanyInfo',
  async (_, { getState }) => {
    // @ts-ignore
    const { creator } = getState().information.material;
    const company = await proofchain().company.getCompany(creator);
    return { company };
  }
);

export const fetchMaterialInfo = createAsyncThunk(
  'client/fetchMaetrialInfo',
  async (_, { getState }) => {
    //@ts-ignore
    const { uuid } = getState().information.materialInstance;
    const material = await proofchain().material.getById(uuid);
    return { material };
  }
);

export const fetchMaterialInstanceInfo = createAsyncThunk(
  'client/fetchMaterialInstanceInfo',
  async ({ uuid }: { uuid: number }) => {
    console.log(uuid);
    const materialInstance = await proofchain().material.getMaterialByUuid(
      uuid
    );
    return { materialInstance };
  }
);
