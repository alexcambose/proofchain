import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import { State, wrapper } from '../store';
import { styletron } from '../styletron';
import { init } from '@utils/auth/torus';
import { isClient } from '@utils/next';
import { useDispatch, useSelector } from 'react-redux';
import 'types/declarations';
import '@assets/styles/style.css';
import AuthManager from '@utils/auth/authManager';
import { initWeb3Instance } from 'web3';
import { refreshLogin } from 'store/user/actions';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

if (isClient()) {
  init();
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state: State) => state.user.loggedIn);
  useEffect(() => {
    if (loggedIn) {
      dispatch(refreshLogin());
    }
  }, []);
  useEffect(() => {
    console.log(loggedIn, router.pathname);
    if (loggedIn && router.pathname === '/login') {
      router.push('/');
    }
    if (!loggedIn && router.pathname !== '/login') {
      router.push('/login');
    }
  }, [loggedIn]);

  return (
    <StyletronProvider value={styletron}>
      <BaseProvider theme={LightTheme}>
        <Component {...pageProps} />
      </BaseProvider>
    </StyletronProvider>
  );
}
export default wrapper.withRedux(MyApp);
