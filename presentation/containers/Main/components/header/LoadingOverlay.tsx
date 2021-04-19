import ProofchainLogoWhite from '@assets/svg/proofchain-logo-full-light-padded.svg';
import * as React from 'react';
import styled, { keyframes } from 'styled-components';
interface ILoadingOverlayProps {
  isVisible: boolean;
}
const dash = keyframes`
 0% {
    stroke-dashoffset: 1000;
  }
  60% {
    stroke-dashoffset: 750;
    fill: black;
    filter: drop-shadow(0 0 0px rgba(255, 255, 255));
  }
   65% {
    stroke-dashoffset: 600;
        fill: white;

  }
  80% {
    filter: drop-shadow(0 0 10px rgba(255, 255, 255));
    stroke-dashoffset: 600;
    fill: white;
  }
  100% {
    filter: drop-shadow(0 0 0px rgba(255, 255, 255));
    stroke-dashoffset: 600;
    fill: white;
  }
`;
const LoadingOverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.sizing.scale1000};
  transform: ${({ theme }) => theme.animation.standard};
  z-index: 99;
  transition: ${({ theme }) => theme.animation.standard};
  opacity: 1;
  visibility: visible;
  & svg {
    font-size: 31em;
  }
  & path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    fill: black;
    stroke: white;
    stroke-width: 1px;

    animation: ${dash} 4500ms forwards;
  }
  ${({ isHidden }) =>
    isHidden &&
    `
    opacity: 0;
    visibility: hidden;
  `};
`;

const LoadingOverlay: React.FunctionComponent<ILoadingOverlayProps> = ({
  isVisible,
}) => {
  return (
    <LoadingOverlayContainer isHidden={!isVisible}>
      <ProofchainLogoWhite />
    </LoadingOverlayContainer>
  );
};

export default LoadingOverlay;
