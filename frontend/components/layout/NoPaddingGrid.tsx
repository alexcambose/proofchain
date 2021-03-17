import { BEHAVIOR, Cell, Grid, GridProps } from 'baseui/layout-grid';
import React from 'react';

interface INoPaddingGridProps extends GridProps {}
const NoPaddingGrid: React.FC<INoPaddingGridProps> = (props) => {
  return (
    <Grid
      behavior={BEHAVIOR.fluid}
      overrides={{
        Grid: {
          style: ({ $theme }) => ({
            paddingLeft: '0 !important',
            paddingRight: '0 !important',
          }),
        },
      }}
      {...props}
    />
  );
};
export default NoPaddingGrid;
