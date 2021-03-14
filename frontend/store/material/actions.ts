import { createAsyncThunk } from '@reduxjs/toolkit';
import transactionWrapper from '@utils/transactionWrapper';
import proofchain from 'proofchain';
const proofchainFetchMaterials = async ({
  onlyRawMaterials,
  onlyMaterials,
}: {
  onlyRawMaterials?: boolean;
  onlyMaterials?: boolean;
}) => {
  let materials = await proofchain().material.all({
    onlyRawMaterials,
    onlyMaterials,
  });
  materials = await Promise.all(
    materials.map(async (e) => ({
      ...e,
      events: {
        MaterialCreate: (
          await proofchain().material.getRawPastEvents('MaterialCreate', {
            company: proofchain().material.fromAddress,
          })
        )[0],
      },
    }))
  );
  return materials;
};
export const fetchMaterials = createAsyncThunk(
  'material/fetchMaterials',
  async () => {
    const materials = await proofchainFetchMaterials({ onlyMaterials: true });
    return { materials };
  }
);
export const fetchRawMaterials = createAsyncThunk(
  'material/fetchRawMaterials',
  async () => {
    const materials = await proofchainFetchMaterials({
      onlyRawMaterials: true,
    });
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
