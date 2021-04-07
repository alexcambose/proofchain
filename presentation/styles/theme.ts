import { createGlobalStyle, ThemeProvider } from 'styled-components';

import normalizeCss from 'normalize.css';
import fonts from './fonts';
export const GlobalStyle = createGlobalStyle`
  ${fonts}
  :root {
    font-size: 16px;
  }
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
const sizes = {
  xs: '320px',
  sm: '768px',
  lg: '1200px',
};
const media = {
  xs: (styles) => `@media only screen and (max-width: ${sizes.xs}){${styles}}`,
  sm: (styles) => `@media only screen and (max-width: ${sizes.sm}){${styles}}`,
  lg: (styles) => `@media only screen and (max-width: ${sizes.lg}){${styles}}`,
};

export const theme = {
  colors: {
    primary: '#587E91',
    accent: '#F1A208',
    white: '#fff',
    gray: {
      50: '#F6F6F6',
    },
  },
  sizing: {
    scale0: '2px',
    scale100: '4px',
    scale200: '6px',
    scale300: '8px',
    scale400: '10px',
    scale500: '12px',
    scale550: '14px',
    scale600: '16px',
    scale650: '18px',
    scale700: '20px',
    scale750: '22px',
    scale800: '24px',
    scale850: '28px',
    scale900: '32px',
    scale950: '36px',
    scale1000: '40px',
    scale1200: '48px',
    scale1400: '56px',
    scale1600: '64px',
    scale2400: '96px',
    scale3200: '128px',
    scale4800: '192px',
  },
  media,
  sizes,
};
