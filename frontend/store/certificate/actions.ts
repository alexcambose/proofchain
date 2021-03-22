import { createAsyncThunk } from '@reduxjs/toolkit';
import transactionWrapper from '@utils/transactionWrapper';
import proofchain from 'proofchain';

export const fetchCertificates = createAsyncThunk(
  'material/fetchCertificates',
  async () => {
    try {
      console.log(proofchain() + '');
      let certificates = await proofchain().certificateAuthority.certificates();

      return { certificates };
    } catch (e) {
      console.log(e);
    }
    return { certificates: [] };
  }
);
export const createCertificate = createAsyncThunk(
  'material/createCertificate',
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
