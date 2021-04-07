import { createGlobalStyle, ThemeProvider } from 'styled-components';
import React from 'react';
import { GlobalStyle, theme } from '../styles/theme';

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
