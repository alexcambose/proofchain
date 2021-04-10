import { createGlobalStyle, ThemeProvider } from 'styled-components';
import React from 'react';
import {
  fab,
  faGithub,
  faFacebook,
  faTwitter,
  faLinkedin,
  faMedium,
} from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { GlobalStyle, theme } from '../styles/theme';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import '@components/beforeAfter/BeforeAfterReact.css';
library.add(fab, faGithub, faFacebook, faTwitter, faLinkedin, faMedium, faBars);
const App: React.FC<any> = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default App;
