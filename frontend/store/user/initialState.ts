import { IUser } from './interface';

const initialState: IUser = {
  loggedIn: false,
  address: '',
  hasEntity: false,
  entityType: null,
};

export default initialState;
