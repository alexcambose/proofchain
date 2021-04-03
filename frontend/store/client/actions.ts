import { createAsyncThunk } from '@reduxjs/toolkit';
import proofchain from 'proofchain';

const fetchMaterialHistory = async (material) => {
  console.log(material);
  // MaterialTransfer mint
  const mintEvent = material.mintEvent;
  console.log(
    mintEvent
    // await proofchain()
    //   .material.contract.getMaterialInfoFromBatchId(material.uuid)
    //   .call()
  );
  //
};

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
    await fetchMaterialHistory(materialInstance);
    return { material, materialInstance };
  }
);
