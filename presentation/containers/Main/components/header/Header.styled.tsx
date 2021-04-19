import styled, { css } from 'styled-components';

export const HeaderContainer = styled.section`
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const HeaderOverlay = styled.div`
  position: absolute;
  top: 0;
  height: 140vh;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: -1;
`;

export const HeaderVideo = styled.video`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  @media (min-aspect-ratio: 16/9) {
    width: 100%;
    height: auto;
  }
  @media (max-aspect-ratio: 16/9) {
    width: auto;
    height: 100%;
  }
  z-index: -2;
`;

export const HeaderContent = styled.div``;

export const HeaderText1 = styled.div`
  margin-bottom: 1vh;
  font-weight: 600;
  opacity: 0.8;
  ${({ theme }) =>
    theme.media.md(css`
      text-align: center;
    `)}
`;
export const HeaderText2 = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.font.xlarge};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.accent};
`;
export const HeaderText2Silent = styled.span`
  color: ${({ theme }) => theme.colors.white};
`;

export const HeaderText3 = styled.div`
  max-width: 34vw;
  margin: 4vh auto 0;
  ${({ theme }) =>
    theme.media.md(css`
      max-width: 100%;
    `)}
  text-align: center;

  font-weight: 600;
`;
export const HeaderActions = styled.div`
  margin-top: 3vh;
  display: flex;
  align-items: center;
  justify-content: center;
  & > a {
    padding: ${({ theme }) => theme.sizing.scale600};
  }
`;
export const MouseContainer = styled.div`
  position: absolute;
  top: 94vh;
  left: 0;
  right: 0;
  text-align: center;

  & svg {
    transition: ${({ theme }) => theme.animation.standard};

    width: 2rem;
    height: auto;
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
  }
`;
