import styled, { css } from 'styled-components';
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  [type='submit'] {
    margin-top: ${({ theme }) => theme.sizing.scale800};
    width: 20%;
    align-self: flex-end;
  }
`;
export default Form;
export const FormSuccess = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: ${({ theme }) => theme.sizing.scale800};
`;
