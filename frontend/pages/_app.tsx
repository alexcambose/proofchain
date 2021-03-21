import '@assets/styles/style.css';
import 'normalize.css';
import { refreshBalance, refreshLogin } from '@store/user/actions';
import { init } from '@utils/auth/torus';
import { isClient } from '@utils/next';
import { BaseProvider, LightTheme } from 'baseui';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider as StyletronProvider } from 'styletron-react';
import '@types/declarations';
import { State, wrapper } from '../store';
import { styletron } from '../styletron';
import { EntityTypeEnum } from '@enums';
import { fetchCompanyEntityInfo } from '@store/companyEntity/actions';
import { ToasterContainer } from 'baseui/toast';
import LoadingOverlay from '@components/LoadingOverlay';
import { initWeb3Instance } from 'web3Instance';
import authManager, { AuthManager } from '@utils/auth/authManager';

if (isClient()) {
  init();
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state: State) => state.user.loggedIn);
  const entityType = useSelector((state: State) => state.user.entityType);
  const hasEntity = useSelector((state: State) => state.user.hasEntity);
  const isLoading = useSelector((state: State) => state.application.loading);
  useEffect(() => {
    if (loggedIn && router.pathname === '/login') {
      router.push('/');
    }
    if (!loggedIn && router.pathname !== '/login') {
      router.push('/login');
    }
    (async () => {
      console.log(loggedIn);
      if (loggedIn) {
        await initWeb3Instance(authManager.getInfo());
        await dispatch(refreshBalance());
      }
    })();
  }, [loggedIn]);
  //redirect to / if the user does not have an entity
  // useEffect(() => {
  //   if (!isLoading && !hasEntity && router.pathname !== '/') {
  //     router.push('/');
  //   }
  // }, [hasEntity, isLoading]);
  useEffect(() => {
    if (entityType === EntityTypeEnum.COMPANY) {
      dispatch(fetchCompanyEntityInfo());
    } else if (entityType === EntityTypeEnum.CERTIFICATE_AUTHORITY) {
      // todo
    }
  }, [entityType]);
  return (
    <StyletronProvider value={styletron}>
      <BaseProvider theme={LightTheme}>
        <ToasterContainer autoHideDuration={3500}>
          <LoadingOverlay />
          <Component {...pageProps} />
        </ToasterContainer>
      </BaseProvider>
    </StyletronProvider>
  );
}
export default wrapper.withRedux(MyApp);
