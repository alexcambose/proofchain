import {
  Button as BaseUiButton,
  ButtonProps as BaseUiButtonProps,
} from 'baseui/button';
interface ButtonProps extends BaseUiButtonProps {}
const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <BaseUiButton
      {...props}
      overrides={{
        BaseButton: {
          style: ({ $theme }) => ({
            width: '100%',
            marginTop: $theme.sizing.scale200,
            marginBottom: $theme.sizing.scale200,
            marginRight: $theme.sizing.scale400,
          }),
        },
      }}
    >
      {children}
    </BaseUiButton>
  );
};
export default Button;
