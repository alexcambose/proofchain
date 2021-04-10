import TreeSvg from '@assets/svg/tree.svg';
import FingerprintSvg from '@assets/svg/fingerprint.svg';

import styled, { css } from 'styled-components';

export const InformationContainer = styled.section`
  position: relative;
  z-index: 0;
  padding-top: ${({ theme }) => theme.sizing.scale2400};
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => theme.colors.backgroundLighter} 40%
  );
  overflow: hidden;
`;
export const InformationSection = styled.section`
  position: relative;
  margin-top: ${({ theme }) => theme.sizing.scale1400};
  ${({ height }) => height && `height: ${height}px`};
  ${({ theme }) =>
    theme.media.sm(css`
      height: auto;
    `)}
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
  margin-bottom: ${({ theme }) => theme.sizing.scale400};
  text-align: left;
`;
export const InformationContent = styled.p`
  line-height: 1.2rem;
`;
export const InformationSvgContainer = styled.div`
  & > svg {
    width: 500px;

    height: calc(40vh + 100px);
    ${({ theme }) =>
      theme.media.lg(css`
        width: 300px;
      `)}
  }
`;
export const InformationQuote = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.font.small};
  margin-top: ${({ theme }) => theme.sizing.scale300};
  opacity: 0.5;
  &:first-of-type {
    margin-top: auto;
  }
`;
export const InformationTree = styled(TreeSvg)`
  width: 100%;
  height: auto;
`;
export const InformationEaseOfUseImage1Line = styled.img`
  width: 1px;
  background: #fff;
  height: 600px;
  position: absolute;
  left: 170px;
  top: -40px;
  ${({ theme }) =>
    theme.media.lg(css`
      display: none;
    `)}
`;
export const InformationEaseOfUseImage1 = styled.img`
  width: 340px;
  height: auto;
  position: absolute;
  box-shadow: 0 0 20px 20px #00000022;
  ${({ theme }) =>
    theme.media.lg(css`
      position: relative;
      top: auto;
      left: auto;
      width: 100%;
    `)}
`;
export const InformationEaseOfUseImage2 = styled.img`
  width: 340px;
  height: auto;
  position: absolute;
  top: 300px;
  left: 460px;
  box-shadow: 0 0 20px 20px #00000022;
  ${({ theme }) =>
    theme.media.lg(css`
      position: relative;
      top: auto;
      left: auto;
      width: 100%;
    `)}
`;
export const InformationCodeDemoImg = styled.img`
  width: 100%;

  height: auto;
`;
export const InformationFingerprintIcon = styled(FingerprintSvg)`
  position: absolute;
  width: 50vw;
  height: 50vh;
  top: 0;
  left: -50%;
  z-index: -1;
`;
