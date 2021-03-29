import { IUser } from './interface';

const initialState: IUser = {
  name: '',
  loggedIn: false,
  address: '',
  hasEntity: false,
  entityType: null,
  balance: '0',
  loadingBalance: false,
  companyEntityType: null,
};

export default initialState;
