import styled, { css } from 'styled-components';

export const Col = styled.div`
  display: flex;
  margin-top: ${({ theme }) => theme.sizing.scale1200};
  ${({ theme }) =>
    theme.media.lg(css`
      flex-direction: column;
    `)}
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
  ${({ horizontallyCentered }) =>
    horizontallyCentered &&
    css`
      align-items: center;
    `}
     ${({ theme }) =>
    theme.media.lg(css`
      justify-content: center;
      align-items: center;
      padding-bottom: 20px;
      margin-left: 0 !important;
    `)}
`;
