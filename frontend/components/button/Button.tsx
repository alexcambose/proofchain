import * as React from 'react';
import StyledButton from './Button.styles';
interface IButtonProps {}

const Button: React.FunctionComponent<IButtonProps> = ({ ...props }) => {
  return <StyledButton {...props} />;
};

export default Button;
