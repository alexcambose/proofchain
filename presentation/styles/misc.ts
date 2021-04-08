import { css } from 'styled-components';

export default css`
  ::-moz-selection {
    color: white;
    background: #f1a208;
  }

  ::selection {
    color: white;
    background: #f1a208;
  }
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #0a1924;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #f1a208;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #d69006;
  }
  ::-webkit-scrollbar-thumb:active {
    background: #d69006;
  }
`;
