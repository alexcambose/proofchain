import { MakeStore, createWrapper, Context, HYDRATE } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import UserSlice from './user';
import { IUser } from './user/interface';
import CompanyEntitySlice from './companyEntity';
import { ICompanyEntity } from './companyEntity/interface';
import MaterialSlice from './material';
import { IMaterialStore } from './material/interface';
import ApplicationSlice from './application';
import BatchSlice from './batch';
import TransportSlice from './transport';
import { IApplication } from './application/interface';
import { IBatchStore } from './batch/interface';
import { ITransportStore } from './transport/interface';
import { ICertificateStore } from './certificate/interface';
import CertificateSlice from './certificate';

export interface State {
  user: IUser;
  companyEntity: ICompanyEntity;
  material: IMaterialStore;
  batch: IBatchStore;
  application: IApplication;
  transport: ITransportStore;
  certificate: ICertificateStore;
}

// create a makeStore function
const makeStore: MakeStore<State> = (context: Context) =>
  configureStore({
    middleware: [thunk],
    reducer: {
      user: UserSlice,
      companyEntity: CompanyEntitySlice,
      material: MaterialSlice,
      application: ApplicationSlice,
      batch: BatchSlice,
      transport: TransportSlice,
      certificate: CertificateSlice,
    },
  });

// export an assembled wrapper
export const wrapper = createWrapper<State>(makeStore, { debug: true });
