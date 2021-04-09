import styled, { css } from 'styled-components';
const inputStyles = css`
  width: 100%;
  padding: ${({ theme }) => theme.sizing.scale400};
  margin: ${({ theme }) => theme.sizing.scale400} 0;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: ${({ theme }) => theme.colors.white};
`;
export const InputElement = styled.input`
  ${inputStyles}
`;
export const TextareaElement = styled.textarea`
  ${inputStyles}
  resize: vertical;
  min-height: 100px;
`;
export const FormGroup = styled.div`
  padding: ${({ theme }) => theme.sizing.scale400} 0;
`;
export const Label = styled.label`
  display: block;
`;
