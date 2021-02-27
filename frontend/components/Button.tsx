import {
  Button as BaseUiButton,
  ButtonProps as BaseUiButtonProps,
} from 'baseui/button';
interface ButtonProps extends BaseUiButtonProps {}
const Button: React.FC<ButtonProps> = ({ children, props }) => {
  return (
    <BaseUiButton
      {...props}
      overrides={{ BaseButton: { style: { width: '100%' } } }}
    >
      {children}
    </BaseUiButton>
  );
};
export default Button;
