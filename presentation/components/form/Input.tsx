import * as React from 'react';
import {
  FormGroup,
  InputElement,
  Label,
  TextareaElement,
} from './Input.styled';

interface IInputProps {
  label?: string;
  name: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'textarea';
}

const Input: React.FunctionComponent<IInputProps> = ({
  type,
  label,
  name,
  placeholder,
}) => {
  let inputElement = (
    <InputElement type={type} id={name} name={name} placeholder={placeholder} />
  );
  if (type === 'textarea')
    inputElement = (
      <TextareaElement
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
      />
    );
  return (
    <FormGroup>
      {label && <Label htmlFor={name}>{label}</Label>}
      {inputElement}
    </FormGroup>
  );
};

export default Input;
