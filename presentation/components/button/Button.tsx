import styled from 'styled-components';

const Button = styled.button`
  border: none;
  padding: ${({ theme }) =>
    theme.sizing.scale500 + ' ' + theme.sizing.scale800};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.accentDarker};
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background-color: ${({ theme }) => theme.colors.accent};
  }
  &:disabled {
    cursor: not-allowed;
    background-color: gray;
  }
`;
export default Button;
