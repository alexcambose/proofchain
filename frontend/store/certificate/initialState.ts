import { ICertificateStore } from './interface';

const initialState: ICertificateStore = {
  certificates: [],
  companyCertificates: [],
  loadingCertificates: false,
  minimumStake: '0',
  certificateInfo: {
    certificate: null,
    additionalInfo: null,
  },
  loadingCertificateInfo: false,
};

export default initialState;
