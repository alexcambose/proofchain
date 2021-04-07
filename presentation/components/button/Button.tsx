import styled from 'styled-components';

export default styled.button`
  border: none;
  padding: ${({ theme }) =>
    theme.sizing.scale500 + ' ' + theme.sizing.scale800};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.accent};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.accentDarker};
  }
`;
