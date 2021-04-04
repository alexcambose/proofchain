import {
  Button as BaseUiButton,
  ButtonProps as BaseUiButtonProps,
} from 'baseui/button';
import { useMemo } from 'react';
export enum ButtonColorStyle {
  DANGER,
}
export interface ButtonProps extends BaseUiButtonProps {
  colorStyle?: ButtonColorStyle;
  fullWidth?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  children,
  colorStyle,
  fullWidth = true,
  ...props
}) => {
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
    return new Function();
  }, [colorStyle]);

  return (
    <BaseUiButton
      overrides={{
        BaseButton: {
          style: ({ $theme }) => ({
            ...(fullWidth ? { width: '100%' } : {}),
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
