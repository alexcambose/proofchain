import { createAsyncThunk } from '@reduxjs/toolkit';
import transactionWrapper from '@utils/transactionWrapper';
import proofchain from 'proofchain';
import web3Instance from 'web3Instance';
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
      proofchain().material.create({
        name,
        code,
        images: [],
        amountIdentifier,
        recipeMaterialTokenId,
        recipeMaterialAmount,
      })
    );
    if (!result) throw new Error('Error!');
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
    await transactionWrapper(
      await proofchain().material.mint({
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
export const fetchMaterialInfoCertificates = createAsyncThunk(
  'material/fetchMaterialInfoCertificates',
  async ({ materialTokenId }: { materialTokenId: number }) => {
    let certificates = [];
    const certificateInstances = await proofchain().material.assigedCertificates(
      materialTokenId
    );
    for (let certificateInstance of certificateInstances) {
      const certificate = await proofchain().certificateAuthority.getByCode(
        certificateInstance.code
      );
      const certificateAuthority = await proofchain().certificateAuthority.getCertificateAuthority(
        certificate.certificateAuthority
      );
      const assignEvents = await proofchain().material.getPastEvents(
        'MaterialAssignedCertificate',
        {
          certificateAuthority: certificateAuthority.owner,
          certificateCode: certificate.code,
          materialTokenId,
        }
      );
      certificates.push({
        certificate,
        certificateInstance,
        certificateAuthority,
        assignEvent: assignEvents[0],
        assignTimestamp: // @ts-ignore
        (await web3Instance().eth.getBlock(assignEvents[0].blockNumber))
          .timestamp,
      });
    }
    return { certificates };
  }
);
