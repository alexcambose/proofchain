import { Grommet } from 'grommet';
import { wrapper } from '../store';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Grommet theme={{}}>
        <Component {...pageProps} />
      </Grommet>
    </>
  );
}
export default wrapper.withRedux(MyApp);
