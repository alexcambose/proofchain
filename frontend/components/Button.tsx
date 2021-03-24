import {
  Button as BaseUiButton,
  ButtonProps as BaseUiButtonProps,
} from 'baseui/button';
import { useMemo } from 'react';
export enum ButtonColorStyle {
  DANGER,
}
interface ButtonProps extends BaseUiButtonProps {
  colorStyle?: ButtonColorStyle;
}
const Button: React.FC<ButtonProps> = ({ children, colorStyle, ...props }) => {
  let colorOverrides = useMemo(() => {
    if (colorStyle === ButtonColorStyle.DANGER) {
      return ($theme) => ({
        color: $theme.colors.contentOnColor,
        backgroundColor: $theme.colors.negative,
        [':hover']: {
          backgroundColor: $theme.colors.negative500,
        },
      });
    }
  }, [colorStyle]);

  return (
    <BaseUiButton
      overrides={{
        BaseButton: {
          style: ({ $theme }) => ({
            width: '100%',
            marginTop: $theme.sizing.scale200,
            marginBottom: $theme.sizing.scale200,
            marginRight: $theme.sizing.scale400,

            ...colorOverrides($theme),
          }),
        },
      }}
      {...props}
    >
      {children}
    </BaseUiButton>
  );
};
export default Button;
