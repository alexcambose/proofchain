import { Cell, Grid, GridProps } from 'baseui/layout-grid';
import * as React from 'react';

interface IContainerProps extends GridProps {
  children: React.ReactNode;
}

const Container: React.FunctionComponent<IContainerProps> = ({
  children,
  ...props
}) => {
  return (
    <Grid
      {...props}
      overrides={{
        Grid: {
          style: ({ $theme }) => ({
            paddingLeft: `0 !important`,
            paddingRight: `0 !important`,
          }),
        },
      }}
    >
      <Cell
        span={12}
        overrides={{
          Cell: {
            style: ({ $theme }) => ({
              paddingLeft: `0 !important`,
              paddingRight: `0 !important`,
            }),
          },
        }}
      >
        {children}
      </Cell>
    </Grid>
  );
};

export default Container;
