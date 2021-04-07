import { createGlobalStyle, ThemeProvider } from 'styled-components';

import normalizeCss from 'normalize.css';
import fonts from './fonts';
export const GlobalStyle = createGlobalStyle`
  ${fonts}

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins';
    font-weight: normal;
    font-style: normal;
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
