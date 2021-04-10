import styled from 'styled-components';
export const VisionGameContainer = styled.div`
  height: 150vh;
  /* border: 1px solid white; */
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const VisionGameIndicator = styled.div`
  font-size: ${({ theme }) => theme.font.large};

  /* position: absolute; */
`;
export const VisionGameOptions = styled.div``;
export const VisionGameOptionItem = styled.div`
  margin-bottom: ${({ theme }) => theme.sizing.scale1200};
  padding-left: ${({ theme }) => theme.sizing.scale600};
  font-size: ${({ theme }) => theme.font.large};
  font-weight: 600;
`;
export const VisionGameItems = styled.div``;
export const VisionGameItemsContainer = styled.div`
  display: flex;
  position: relative;
`;
export const VisionGameIndicatorContainer = styled.div`
  height: 100%;
`;
