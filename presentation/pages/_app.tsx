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
import { ParallaxProvider } from 'react-scroll-parallax';

library.add(fab, faGithub, faFacebook, faTwitter, faLinkedin, faMedium, faBars);
const App: React.FC<any> = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <ParallaxProvider>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ParallaxProvider>
    </>
  );
};

export default App;
