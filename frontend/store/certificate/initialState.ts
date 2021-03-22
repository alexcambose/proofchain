import { ICertificateStore } from './interface';

const initialState: ICertificateStore = {
  certificates: [],
  loadingCertificates: false,
  minimumStake: '0',
};

export default initialState;
