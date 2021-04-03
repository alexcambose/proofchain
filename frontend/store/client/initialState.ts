import { IClientStore } from './interface';

const initialState: IClientStore = {
  materialUuid: '',
  information: {
    company: null,
    material: null,
    materialInstance: null,
  },
};

export default initialState;
