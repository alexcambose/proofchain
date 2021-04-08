import styled, { css } from 'styled-components';
import Container from '@components/layout/Container';
export const VisionTopSpacer = styled.div`
  padding-top: calc(100vh - 50vh);
`;
export const VisionContainer = styled.div`
  position: absolute;
  top: 80vh;
  left: 0;
  right: 0;
  background: linear-gradient(
    180deg,
    transparent 0%,
    ${({ theme }) => theme.colors.background} 40vh
  );
`;
export const VisionHeader = styled.h1`
  ${({ theme }) => theme.typography.title};
`;
