import styled, { css } from 'styled-components';

export const InformationContainer = styled.div`
  position: relative;
  z-index: -2;
  padding-top: ${({ theme }) => theme.sizing.scale2400};
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => theme.colors.backgroundLighter} 50%
  );
`;
export const InformationHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const InformationHeaderStart = styled.span`
  margin: ${({ theme }) => theme.sizing.scale800};
  opacity: 0.5;
  text-transform: uppercase;
`;
export const InformationHeaderLogo = styled.div`
  & > svg {
    width: calc(20rem + 34vw);
    height: 24vh;
  }
`;
export const InformationHeaderDescription = styled.div`
  width: ${({ theme }) => theme.sizes.sm};
  margin: 0 auto;
  ${({ theme }) =>
    theme.media.sm(css`
      max-width: 100%;
    `)}
  text-align:center;
  line-height: 30px;
  letter-spacing: 2px;
`;
export const InformationHeaderSubTitle = styled.h2`
  font-size: ${({ theme }) => theme.font.large};
  margin-top: ${({ theme }) => theme.sizing.scale1600};
`;
export const InformationHeaderTitle = styled.h1`
  margin-top: ${({ theme }) => theme.sizing.scale1600};
  ${({ theme }) => theme.typography.title};
  text-align: left;
`;
