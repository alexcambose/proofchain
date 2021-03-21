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
  async ({
    name,
    code,
    amountIdentifier,
    recipe,
  }: {
    name: string;
    code: string;
    amountIdentifier: string;
    recipe?: [
      {
        materialTokenId: string;
        materialTokenAmount: number;
      }
    ];
  }) => {
    let recipeMaterialTokenId = [];
    let recipeMaterialAmount = [];
    for (let { materialTokenId, materialTokenAmount } of recipe) {
      if (materialTokenId && materialTokenAmount) {
        recipeMaterialTokenId.push(materialTokenId);
        recipeMaterialAmount.push(materialTokenAmount);
      }
    }
    const result = await transactionWrapper(
      async () =>
        await proofchain().material.create({
          name,
          code,
          images: [],
          amountIdentifier,
          recipeMaterialTokenId,
          recipeMaterialAmount,
        })
    );
    return {};
  }
);
export const fetchMaterialInfo = createAsyncThunk(
  'material/fetchMaterialInfo',
  async ({ materialTokenId }: { materialTokenId: number }) => {
    const material = await proofchain().material.getById(materialTokenId);
    const balance = await proofchain().material.getBalance(materialTokenId);
    const transfers = await proofchain().material.getTransfers({
      materialTokenId,
    });
    const inventory = await proofchain().material.getOwnedMaterialsUuid(
      materialTokenId
    );
    return { material, balance, transfers, inventory };
  }
);
export const mintMaterial = createAsyncThunk(
  'material/mintMaterial',
  async ({
    materialTokenId,
    amount,
    fromBatchId,
    fromBatchMaterialsUuid,
  }: {
    materialTokenId: number;
    amount?: number;
    fromBatchId?: number[];
    fromBatchMaterialsUuid?: number[][];
  }) => {
    await transactionWrapper(() =>
      proofchain().material.mint({
        materialTokenId,
        amount,
        fromBatchId,
        fromBatchMaterialsUuid,
      })
    );

    const balance = await proofchain().material.getBalance(materialTokenId);
    const transfers = await proofchain().material.getTransfers({
      materialTokenId,
    });
    return { balance, materialTokenId, transfers };
  }
);
