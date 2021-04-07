import styled from 'styled-components';

export const HeaderContainer = styled.div`
  height: 100vh;
  position: relative;
  overflow: hidden;
`;
export const HeaderOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: -1;
`;

export const HeaderVideo = styled.video`
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: auto;
  z-index: -2;
`;
