import styled, { css } from 'styled-components';

export const Col = styled.div`
  display: flex;
  margin-top: ${({ theme }) => theme.sizing.scale1200};
`;
export const Row = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  &:not(:first-of-type) {
    margin-left: ${({ theme }) => theme.sizing.scale800};
  }
  ${({ centered }) =>
    centered &&
    css`
      justify-content: center;
    `}
`;
