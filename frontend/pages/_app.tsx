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

if (isClient()) {
  init();
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state: State) => state.user.loggedIn);
  const entityType = useSelector((state: State) => state.user.entityType);
  useEffect(() => {
    console.log(loggedIn, router.pathname);
    if (loggedIn && router.pathname === '/login') {
      router.push('/');
    }
    if (!loggedIn && router.pathname !== '/login') {
      router.push('/login');
    }
    (async () => {
      console.log(loggedIn);
      if (loggedIn) {
        await dispatch(refreshLogin());
        await dispatch(refreshBalance());
      }
    })();
  }, [loggedIn]);
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
          <Component {...pageProps} />
        </ToasterContainer>
      </BaseProvider>
    </StyletronProvider>
  );
}
export default wrapper.withRedux(MyApp);
