import { Card, StyledAction, StyledBody } from 'baseui/card';
import React from 'react';

interface IGridBaseProps {
  children: React.ReactNode;
  title?: React.ReactNode;
}
const GridBase: React.FC<IGridBaseProps> = ({ title, children }) => {
  return (
    <Card
      overrides={{
        Root: {
          style: ({ $theme }) => ({
            height: '100%',
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
