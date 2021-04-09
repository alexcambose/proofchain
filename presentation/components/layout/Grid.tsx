import styled, { css } from 'styled-components';

export const Col = styled.div`
  display: flex;
  margin-top: ${({ theme }) => theme.sizing.scale2400};
`;
export const Row = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  ${({ centered }) =>
    centered &&
    css`
      justify-content: center;
    `}
`;
