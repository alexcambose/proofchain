import { IClient } from './interface';

const initialState: IClient = {
  materialUuid: '',
  information: {
    company: null,
    material: null,
    materialInstance: null,
  },
};

export default initialState;
