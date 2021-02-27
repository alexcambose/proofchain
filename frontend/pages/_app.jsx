import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider, styled} from 'baseui';
import { wrapper } from '../store';
import { styletron } from '../styletron'


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
