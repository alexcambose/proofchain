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
  let spanTypes = [];
  if (colsContent.length === 3) {
    spanTypes[0] = [1, 3, 5];
    spanTypes[1] = [2, 4, 5];
    spanTypes[2] = [1, 1, 2];
  }
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
      {colsContent.map((c, i) => (
        <Cell
          overrides={
            i === 0
              ? cellOverrideLeft
              : i === colsContent.length - 1
              ? cellOverrideRight
              : undefined
          }
          span={spanTypes[i]}
        >
          {c}
        </Cell>
      ))}
    </Grid>
  );
};
export default FieldArrayGrid;
