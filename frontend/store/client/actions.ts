import { createAsyncThunk } from '@reduxjs/toolkit';
import { EMPTY_ADDRESS } from '@utils/eth';
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
      uuid,
      true
    );
    const material = await proofchain().material.getById(
      materialInstance.materialTokenId
    );
    // await fetchMaterialHistory(materialInstance);
    return { material, materialInstance };
  }
);
