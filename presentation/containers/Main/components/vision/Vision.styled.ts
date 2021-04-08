import styled, { css } from 'styled-components';
export const VisionTopSpacer = styled.div`
  padding-top: calc(100vh - 40vh);
`;
export const VisionContainer = styled.div`
  position: absolute;
  top: 80vh;
  left: 0;
  right: 0;
  z-index: 0;

  background: linear-gradient(
    180deg,
    transparent 0%,
    ${({ theme }) => theme.colors.background} 40vh
  );
`;
export const VisionHeader = styled.h1`
  ${({ theme }) => theme.typography.title};
  margin-bottom: ${({ theme }) => theme.sizing.scale3200};
`;
export const VisionCardsContainer = styled.div`
  display: flex;
  margin-bottom: 20vh;
`;
