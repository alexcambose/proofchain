import { CertificateTypeEnum } from '@enums';
import { createAsyncThunk } from '@reduxjs/toolkit';
import transactionWrapper from '@utils/transactionWrapper';
import proofchain from 'proofchain';
import web3Instance from 'web3Instance';

export const fetchCertificates = createAsyncThunk(
  'certificate/fetchCertificates',
  async () => {
    try {
      let certificates = await proofchain().certificateAuthority.certificates();
      certificates = await Promise.all(
        certificates.map(async (e) => ({
          ...e,
          events: {
            CertificateAuthorityCertificateCreated: (
              await proofchain().certificateAuthority.getRawPastEvents(
                'CertificateAuthorityCertificateCreated',
                {
                  company: proofchain().certificateAuthority.fromAddress,
                }
              )
            )[0],
          },
        }))
      );
      return { certificates };
    } catch (e) {
      console.log(e);
    }
    return { certificates: [] };
  }
);
export const createCertificate = createAsyncThunk(
  'certificate/createCertificate',
  async ({
    name,
    description,
    type,
  }: {
    name: string;
    description: string;
    type: CertificateTypeEnum;
  }) => {
    console.log(name, description);
    const result = await transactionWrapper(
      proofchain().certificateAuthority.createCertificate({
        name,
        description,
        type,
      })
    );

    // return { batches };
  }
);
export const assignCertificate = createAsyncThunk(
  'certificate/asignCertficate',
  async ({
    materialTokenId,
    companyAddress,
    code,
    stake,
  }: {
    materialTokenId?: number;
    companyAddress?: string;
    code: number;
    stake;
  }) => {
    if (companyAddress) {
      console.log(
        `Assigning certificate ${code} to materialTokenId: ${materialTokenId} with stake ${stake}`
      );
      await transactionWrapper(
        proofchain().company.assignCertificate({
          companyAddress,
          certificateCode: code,
          stake,
        })
      );
    } else if (materialTokenId) {
      console.log(
        `Assigning certificate ${code} to compay address: ${materialTokenId} with stake ${stake}`
      );
      await transactionWrapper(
        proofchain().material.assignCertificate({
          materialTokenId,
          certificateCode: code,
          stake,
        })
      );
    }

    // return { batches };
  }
);

export const fetchMinimumStake = createAsyncThunk(
  'certificate/fetchMinimumStake',
  async () => {
    const minimumStake = await proofchain().certificateAuthority.minimumStake();

    return { minimumStake };
  }
);
export const fetchCertificateInfo = createAsyncThunk(
  'certificate/fetchCertificateInfo',
  async ({ certificateCode }: { certificateCode: number }) => {
    try {
      const certificate = await proofchain().certificateAuthority.getByCode(
        certificateCode
      );
      let materialAdditionalInfo = [];
      const materials = await proofchain().material.getFromCertificate(
        certificate.code
      );
      for (let { assignEvent, ...certificateInstance } of materials) {
        const material = await proofchain().material.getById(
          assignEvent.materialTokenId
        );
        materialAdditionalInfo.push({
          material,
          certificateInstance,
          assignEvent,
          // @ts-ignore
          assignTime: (
            await web3Instance().eth.getBlock(assignEvent.blockNumber)
          ).timestamp,
        });
      }
      // companies
      let companyAdditionalInfo = [];
      const companies = await proofchain().company.getFromCertificate(
        certificate.code
      );
      for (let { assignEvent, ...certificateInstance } of companies) {
        const company = await proofchain().company.getCompany(
          assignEvent.companyAddress
        );
        companyAdditionalInfo.push({
          company,
          certificateInstance,
          assignEvent,
          // @ts-ignore
          assignTime: (
            await web3Instance().eth.getBlock(assignEvent.blockNumber)
          ).timestamp,
        });
      }
      return { certificate, materialAdditionalInfo, companyAdditionalInfo };
    } catch (e) {
      console.log(e);
    }
  }
);
export const cancelCertificate = createAsyncThunk(
  'certificate/cancelCertificate',
  async ({
    certificateCode,
    companyAddress,
    materialTokenId,
  }: {
    companyAddress: string;
    certificateCode: number;
    materialTokenId: number;
  }) => {
    if (materialTokenId) {
      await transactionWrapper(
        proofchain().material.cancelCertificate({
          certificateCode,
          materialTokenId,
        })
      );
    } else if (companyAddress) {
      await transactionWrapper(
        proofchain().company.cancelCertificate({
          certificateCode,
          companyAddress,
        })
      );
    }
  }
);

export const fetchCompanyCertificates = createAsyncThunk(
  'certificate/fetchCompanyCertificates',
  async () => {
    let certificateInstances = await proofchain().company.assigedCertificates();
    let information = [];
    for (let certificateInstance of certificateInstances) {
      const certificate = await proofchain().certificateAuthority.getByCode(
        certificateInstance.code
      );
      information.push({ certificateInstance, certificate });
    }
    return { certificates: information };
  }
);
