import { styled } from 'baseui';
import * as React from 'react';
import ProofchainLogoDark from '@assets/images/logo/proofchain-logo-full-dark-padded.svg';
import { useEffect } from 'react';
interface IClientLoadingOverlayProps {
  isVisible: boolean;
}

const LoadingOverlay = styled('div', ({ $theme, $isVisible }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: $theme.sizing.scale1000,
  fontSize: '31em',
  zIndex: 99,
  transition: 'all ' + $theme.animation.timing600,
  opacity: $isVisible ? 1 : 0,
  visibility: $isVisible ? 'visible' : 'hidden',
}));

const ClientLoadingOverlay: React.FunctionComponent<IClientLoadingOverlayProps> = ({
  isVisible,
}) => {
  if (isVisible) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
  useEffect(() => {}, [isVisible]);
  return (
    <LoadingOverlay $isVisible={isVisible}>
      <ProofchainLogoDark className="client-overlay-logo" />
    </LoadingOverlay>
  );
};

export default ClientLoadingOverlay;
