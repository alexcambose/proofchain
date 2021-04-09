import styled, { css } from 'styled-components';
export const ContactContainer = styled.section`
  position: relative;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: column;
  background: transparent
    linear-gradient(
      180deg,
      ${({ theme }) => theme.colors.backgroundLighter} 30%,
      ${({ theme }) => theme.colors.background} 100%
    );
`;
export const ContactTitle = styled.h1`
  margin-top: ${({ theme }) => theme.sizing.scale1600};
  ${({ theme }) => theme.typography.title};
  margin-bottom: ${({ theme }) => theme.sizing.scale800};
  text-align: center;
`;
export const ContactSubtitle = styled.section`
  font-size: ${({ theme }) => theme.font.large};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.sizing.scale800};
`;
