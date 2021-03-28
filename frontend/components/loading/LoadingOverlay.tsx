import { State } from '@store/index';
import { styled } from 'baseui';
import { Spinner } from 'baseui/spinner';
import React from 'react';
import { useSelector } from 'react-redux';

interface ILoadingOverlayProps {}
const Centered = styled('div', {
  position: 'fixed',
  zIndex: 99,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
const LoadingOverlay: React.FC<ILoadingOverlayProps> = () => {
  const isLoading = useSelector((state: State) => state.application.loading);
  if (!isLoading) return null;
  return (
    <Centered>
      <Spinner size={40} />
    </Centered>
  );
};
export default LoadingOverlay;
