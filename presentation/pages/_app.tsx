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
import Head from 'next/head';

library.add(fab, faGithub, faFacebook, faTwitter, faLinkedin, faMedium, faBars);
const App: React.FC<any> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <script src="https://www.googletagmanager.com/gtag/js?id=G-VNT8837Q9M"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-VNT8837Q9M');`,
          }}
        />
      </Head>
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
