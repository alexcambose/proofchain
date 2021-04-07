import { createGlobalStyle, ThemeProvider } from 'styled-components';

import normalizeCss from 'normalize.css';
export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  ${normalizeCss}
`;

export const theme = {
  colors: {
    primary: '#587E91',
    accent: '#F1A208',
    white: '#fff',
  },
};
