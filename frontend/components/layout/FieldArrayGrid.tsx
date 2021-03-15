import { BEHAVIOR, Cell, Grid } from 'baseui/layout-grid';
import React from 'react';

interface IFieldArrayGridProps {
  colsContent: React.ReactNode[];
}
const cellOverrideLeft = {
  Cell: {
    style: ({ $theme }) => ({
      paddingLeft: '0 !important',
    }),
  },
};
const cellOverrideRight = {
  Cell: {
    style: ({ $theme }) => ({
      paddingRight: '0 !important',
    }),
  },
};
const FieldArrayGrid: React.FC<IFieldArrayGridProps> = ({ colsContent }) => {
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
    >
      <Cell overrides={cellOverrideLeft} span={[2, 4, 6]}></Cell>
    </Grid>
  );
};
export default FieldArrayGrid;
