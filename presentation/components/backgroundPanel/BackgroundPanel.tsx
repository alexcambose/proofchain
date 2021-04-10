import styled, { css } from 'styled-components';
const BackgroundPanel = styled.div`
  background: rgba(255, 255, 255, 0.2);
  position: absolute;
  width: 300px;
  height: 300px;
  transform: rotate(45deg);
  border-radius: 30px;
  left: -200px;
  top: ${({ top }) => top}px;
  ${({ isRight }) => isRight && `left: auto; right: -200px;`}
`;
export default BackgroundPanel;
