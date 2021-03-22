import { ICertificateStore } from './interface';

const initialState: ICertificateStore = {
  certificates: [],
  loadingCertificates: false,
  minimumStake: '0',
  certificateInfo: {
    certificate: null,
    materials: null,
  },
  loadingCertificateInfo: false,
};

export default initialState;
