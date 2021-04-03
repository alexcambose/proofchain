import '@assets/styles/style.css';
import '@assets/styles/react-grid.css';
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
import { ToasterContainer } from 'baseui/toast';
import LoadingOverlay from '@components/loading/LoadingOverlay';
import { initWeb3Instance } from 'web3Instance';
import authManager, { AuthManager } from '@utils/auth/authManager';
import { setApplicationLoading } from '@store/application';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab, faEthereum } from '@fortawesome/free-brands-svg-icons';
import {
  faHome,
  faTimes,
  faLink,
  faBan,
  faQrcode,
  faBuilding,
  faHistory,
  faScroll,
  faPlus,
  faCheck,
  faTruckLoading,
  faTruckMoving,
  faTh,
  faCheckDouble,
  faParachuteBox,
  faLightbulb,
  faDotCircle,
  faDrawPolygon,
  faBoxes,
  faTruck,
} from '@fortawesome/free-solid-svg-icons';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'; // import plugin
import { fetchGasPrice } from '@store/application/actions';
import { initClientWeb3Instance } from 'clientWeb3Instance';
dayjs.extend(relativeTime);

library.add(
  fab,
  faHome,
  faTimes,
  faLink,
  faBan,
  faHistory,
  faQrcode,
  faBuilding,
  faScroll,
  faPlus,
  faCheck,
  faTruck,
  faTruckLoading,
  faTruckMoving,
  faParachuteBox,
  faCheckDouble,
  faTh,
  faLightbulb,
  faEthereum,
  faDotCircle,
  faDrawPolygon,
  faBoxes
);

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
        await initClientWeb3Instance();
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
