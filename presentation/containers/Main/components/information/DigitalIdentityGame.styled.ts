import styled, { css } from 'styled-components';
export const DigitalIdentityContainer = styled.div`
  display: flex;
  .before-after-container {
    width: 100% !important;
    padding: 10px;
  }
  .resize.horizontal {
    background: ${({ theme }) => theme.colors.backgroundLighter};
    display: flex;
    align-items: center;
  }
  .before-after-seperator {
    background: ${({ theme }) => theme.colors.primary} !important;
    img {
      transform: translate(-2px, 0px) scale(0.34);
    }
    &:after {
      margin: -15px 0 0 -15px !important;
      height: 30px !important;
      width: 30px !important;
      border: none !important;
      /* border-color: ${({ theme }) => theme.colors.accent} !important; */
      box-shadow: none !important;
    }
  }
`;
