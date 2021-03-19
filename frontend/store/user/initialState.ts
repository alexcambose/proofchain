import { IUser } from './interface';

const initialState: IUser = {
  loggedIn: false,
  address: '',
  hasEntity: false,
  entityType: null,
  balance: '0',
  loadingBalance: false,
};

export default initialState;
