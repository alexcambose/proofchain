import { createAsyncThunk } from '@reduxjs/toolkit';
import transactionWrapper from '@utils/transactionWrapper';
import proofchain from 'proofchain';

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
  async ({ name, description }: { name: string; description: string }) => {
    console.log(name, description);
    const result = await transactionWrapper(() =>
      proofchain().certificateAuthority.createCertificate({
        name,
        description,
      })
    );

    // return { batches };
  }
);
export const assignCertificate = createAsyncThunk(
  'certificate/asignCertficate',
  async ({
    materialTokenId,
    code,
    stake,
  }: {
    materialTokenId: number;
    code: number;
    stake;
  }) => {
    const result = await transactionWrapper(() =>
      proofchain().material.assignCertificate({
        materialTokenId,
        certificateCode: code,
        stake,
      })
    );

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
