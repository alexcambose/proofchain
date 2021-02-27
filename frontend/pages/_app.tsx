import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import { wrapper } from '../store';
import { styletron } from '../styletron';
import { init } from '@utils/auth/torus';
import { isClient } from '@utils/next';
import '@assets/styles/style.css';
if (isClient()) {
  init();
}

function MyApp({ Component, pageProps }) {
  return (
    <StyletronProvider value={styletron}>
      <BaseProvider theme={LightTheme}>
        <Component {...pageProps} />
      </BaseProvider>
    </StyletronProvider>
  );
}
export default wrapper.withRedux(MyApp);
