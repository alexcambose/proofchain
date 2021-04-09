import styled, { css } from 'styled-components';
const ContainerSmall = styled.div`
  width: ${({ theme }) => theme.sizes.md};
  margin: 0 auto;
  ${({ theme }) =>
    theme.media.md(css`
      max-width: 100%;
    `)}
`;
export default ContainerSmall;
