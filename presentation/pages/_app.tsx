import { createGlobalStyle, ThemeProvider } from 'styled-components';
import React from 'react';
import normalizeCss from 'normalize.css';
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  ${normalizeCss}
`;

const theme = {
  colors: {
    primary: '#587E91',
    accent: '#F1A208',
  },
};

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
