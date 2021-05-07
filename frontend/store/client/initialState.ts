import { IClientStore } from './interface';

const initialState: IClientStore = {
  materialUuid: '',
  information: {
    companyInfo: null,
    material: null,
    materialInstance: null,
  },
};

export default initialState;
