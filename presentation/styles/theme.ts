import { createGlobalStyle, ThemeProvider } from 'styled-components';

//@ts-ignore
import normalizeCss from 'normalize.css';
import fonts from './fonts';
import misc from './misc';
export const GlobalStyle = createGlobalStyle`
  ${fonts}
  * {
    box-sizing: border-box;
  }
  :root {
    font-size: 16px;
  }
  html {
    scroll-behavior: smooth;
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins';
    font-weight: normal;
    font-style: normal;
    letter-spacing: 1px;
    user-select: auto;
    overflow-x: hidden;
    overflow-y: hidden;
    color: #fff;
  }
 ${misc}
  ${normalizeCss}
`;
const sizes = {
  xs: '320px',
  sm: '768px',
  md: '992px',
  lg: '1200px',
};
const media = {
  xs: (styles) => `@media only screen and (max-width: ${sizes.xs}){${styles}}`,
  sm: (styles) => `@media only screen and (max-width: ${sizes.sm}){${styles}}`,
  md: (styles) => `@media only screen and (max-width: ${sizes.md}){${styles}}`,
  lg: (styles) => `@media only screen and (max-width: ${sizes.lg}){${styles}}`,
};

export const theme = {
  colors: {
    primary: '#587E91',
    accent: '#F1A208',
    accentDarker: '#d69006',
    background: '#0A1924',
    backgroundLighter: '#07335E',
    white: '#fff',
    black: '#000',
    gray: {
      50: '#F6F6F6',
      100: '#EEEEEE',
    },
  },
  font: {
    small: '.8rem',
    normal: '1rem',
    medium: '1.2rem',
    large: '2rem',
    xlarge: '3.8rem',
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
  animation: {
    standard: '.3s ease',
    fast: '150ms ease',
    superFast: '50ms ease',
  },
  typography: {
    title: {
      fontSize: '3em',
      marginBottom: '2rem',
      fontWeight: 800,
      textAlign: 'center',
      marginTop: 0,
    },
  },
};
