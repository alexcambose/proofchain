import styled from 'styled-components';
export const PersuasiveTextContainer = styled.h2`
  font-size: ${({ theme }) => theme.font.large};
  font-weight: 800;
  text-align: center;
  margin-top: ${({ theme }) => theme.sizing.scale600};
  ${({ small, theme }) => small && `font-size: ${theme.font.normal};`}
`;
export const PersuasiveTextHighlighted = styled.span`
  color: ${({ theme }) => theme.colors.accent};
`;
