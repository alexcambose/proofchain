import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import { wrapper } from '../store';
import { styletron } from '../styletron';
import { init } from '@utils/auth/torus';
import { isClient } from '@utils/next';
import { useDispatch } from 'react-redux';
import 'types/declarations';
import '@assets/styles/style.css';
import AuthManager from '@utils/auth/authManager';
import { initWeb3Instance } from 'web3';
import { refreshLogin } from 'store/user';

if (isClient()) {
  init();
}

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();
  if (AuthManager.isLoggedIn()) {
    dispatch(refreshLogin());
  }
  return (
    <StyletronProvider value={styletron}>
      <BaseProvider theme={LightTheme}>
        <Component {...pageProps} />
      </BaseProvider>
    </StyletronProvider>
  );
}
export default wrapper.withRedux(MyApp);
