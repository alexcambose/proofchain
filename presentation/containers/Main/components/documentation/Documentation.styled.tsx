import styled, { css } from 'styled-components';

export const DocumentationContainer = styled.section`
  position: relative;
  z-index: 0;
  padding-top: ${({ theme }) => theme.sizing.scale2400};
  background: ${({ theme }) => theme.colors.backgroundLighter};
`;

export const DocumentationTitle = styled.h1`
  margin-top: ${({ theme }) => theme.sizing.scale1600};
  ${({ theme }) => theme.typography.title};
  margin-bottom: ${({ theme }) => theme.sizing.scale800};
  text-align: center;
`;
export const DocumentationPanelsContainer = styled.div`
  display: flex;
  ${({ theme }) =>
    theme.media.lg(css`
      flex-direction: column;
    `)}
`;
export const DocumentationPanel = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, left }) =>
    left ? theme.colors.primary : theme.colors};
  padding: ${({ theme }) => theme.sizing.scale1200};
`;
export const DocumentationPanelTitle = styled.h2`
  text-align: center;
  margin-top: 0;
`;
export const DocumentationPanelAction = styled.div`
  text-align: center;
`;

export const DocumentationInfo = styled.p`
  text-align: center;
`;
