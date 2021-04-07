import styled, { css } from 'styled-components';
export default styled.div`
  width: ${({ theme }) => theme.sizes.md};
  margin: 0 auto;
  ${({ theme }) =>
    theme.media.md(css`
      max-width: 100%;
    `)}
`;
