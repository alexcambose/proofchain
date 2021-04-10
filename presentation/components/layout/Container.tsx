import styled, { css } from 'styled-components';
export default styled.div`
  width: ${({ theme }) => theme.sizes.lg};
  margin: 0 auto;
  ${({ theme }) =>
    theme.media.lg(css`
      max-width: 98%;
    `)}
`;
