import { MakeStore, createWrapper, Context, HYDRATE } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import UserSlice from './user';
import { IUser } from './user/interface';
import CompanyEntitySlice from './companyEntity';
import { ICompanyEntity } from './companyEntity/interface';

export interface State {
  user: IUser;
  companyEntity: ICompanyEntity;
}

// create a makeStore function
const makeStore: MakeStore<State> = (context: Context) =>
  configureStore({
    middleware: [thunk],
    reducer: {
      user: UserSlice,
      companyEntity: CompanyEntitySlice,
    },
  });

// export an assembled wrapper
export const wrapper = createWrapper<State>(makeStore, { debug: true });
