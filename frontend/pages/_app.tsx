import '@assets/styles/style.css';
import { refreshLogin } from '@store/user/actions';
import { init } from '@utils/auth/torus';
import { isClient } from '@utils/next';
import { BaseProvider, LightTheme } from 'baseui';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider as StyletronProvider } from 'styletron-react';
import '@types/declarations';
import { State, wrapper } from '../store';
import { styletron } from '../styletron';
import proofchain from 'proofchain';

if (isClient()) {
  init();
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state: State) => state.user.loggedIn);
  // useEffect(() => {

  // }, []);
  useEffect(() => {
    console.log(loggedIn, router.pathname);
    if (loggedIn && router.pathname === '/login') {
      router.push('/');
    }
    if (!loggedIn && router.pathname !== '/login') {
      router.push('/login');
    }
    if (loggedIn) {
      dispatch(refreshLogin());
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
