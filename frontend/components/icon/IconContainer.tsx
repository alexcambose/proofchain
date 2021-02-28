import React from 'react';
import { styled } from 'baseui';
import { useStyletron } from 'baseui';
export const Wrapper = styled('span', ({ $theme }) => ({
  ['svg *']: {
    fill: $theme.colors.primaryA,
  },
}));

interface IconContainerProps {
  style?: React.CSSProperties;

  icon: any;
}
const IconContainer: React.FC<IconContainerProps> = ({ style, icon: Icon }) => {
  const [, theme] = useStyletron();

  return (
    <Wrapper>
      <Icon style={style} color={theme.colors.primary} />
    </Wrapper>
  );
};

export default IconContainer;
