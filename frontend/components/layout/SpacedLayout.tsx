import { styled } from 'baseui';
import * as React from 'react';

interface ISpacedLayoutProps {
  children: any;
}

const Container = styled('div', ({ $theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

const SpacedLayout: React.FunctionComponent<ISpacedLayoutProps> = ({
  children,
}) => {
  return <Container>{children}</Container>;
};

export default SpacedLayout;
