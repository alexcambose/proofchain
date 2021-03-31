import { styled } from 'baseui';
import { Card, StyledAction, StyledBody } from 'baseui/card';
import React from 'react';

interface IGridBaseProps {
  children: React.ReactNode;
  title?: React.ReactNode;
}
const Header = styled('div', ({ $theme }) => ({
  marginLeft: '-' + $theme.sizing.scale600,
  marginRight: '-' + $theme.sizing.scale600,
  marginTop: '-' + $theme.sizing.scale600,
  paddingLeft: $theme.sizing.scale600,
  paddingTop: $theme.sizing.scale300,
  paddingBottom: $theme.sizing.scale300,
  marginBottom: $theme.sizing.scale300,
  background: $theme.colors.accent50,
  ...$theme.typography.LabelLarge,
}));
const GridBase: React.FC<IGridBaseProps> = ({ title, children }) => {
  return (
    <Card
      overrides={{
        Title: {
          component: ({ children }) => <Header>{children}</Header>,
        },
        Root: {
          style: ({ $theme }) => ({
            height: '100%',
            transition: $theme.animation.timing200,

            [':active']: {
              boxShadow: $theme.lighting.shadow700,
              opacity: '0.95',
              // transform: 'scale(1.01)',
            },
          }),
        },
      }}
      title={title}
    >
      <StyledBody>{children}</StyledBody>
    </Card>
  );
};

export default GridBase;
