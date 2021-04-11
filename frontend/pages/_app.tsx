import '@assets/styles/react-flow.css';
import '@assets/styles/react-grid.css';
import '@assets/styles/style.css';
import LoadingOverlay from '@components/loading/LoadingOverlay';
import { setApplicationLoading } from '@store/application';
import { fetchGasPrice } from '@store/application/actions';
import { refreshBalance } from '@store/user/actions';
import '@styles/icons';
import '@types/declarations';
import authManager from '@utils/auth/authManager';
import { init } from '@utils/auth/torus';
import { isClient } from '@utils/next';
import { BaseProvider, LightTheme } from 'baseui';
import { ToasterContainer } from 'baseui/toast';
import initweb3Instance from 'web3Instance';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'; // import plugin
import { useRouter } from 'next/router';
import 'normalize.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider as StyletronProvider } from 'styletron-react';
import { initWeb3Instance } from 'web3Instance';
import { State, wrapper } from '../store';
import { styletron } from '../styletron';
dayjs.extend(relativeTime);

if (isClient()) {
  init();
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state: State) => state.user.loggedIn);
  const isLoading = useSelector((state: State) => state.application.loading);
  useEffect(() => {
    const { pathname } = router;
    if (!pathname.startsWith('/client')) {
      if (loggedIn && pathname === '/login') {
        router.push('/');
      }
      if (!loggedIn && pathname !== '/login') {
        router.push('/login');
      }
      (async () => {
        console.log(loggedIn);
        if (loggedIn) {
          dispatch(setApplicationLoading(true));
          await initWeb3Instance(authManager.getInfo());

          await dispatch(refreshBalance());
          dispatch(setApplicationLoading(false));
          dispatch(fetchGasPrice());
        }
      })();
    } else {
      (async () => {
        dispatch(setApplicationLoading(true));
        await initweb3Instance();
        dispatch(setApplicationLoading(false));
      })();
    }
  }, [loggedIn]);
  return (
    <StyletronProvider value={styletron}>
      <BaseProvider theme={LightTheme}>
        <ToasterContainer autoHideDuration={3500}>
          <LoadingOverlay />
          {!isLoading && <Component {...pageProps} />}
        </ToasterContainer>
      </BaseProvider>
    </StyletronProvider>
  );
}
export default wrapper.withRedux(MyApp);
