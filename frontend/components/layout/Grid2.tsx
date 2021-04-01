import { Cell, GridProps } from 'baseui/layout-grid';
import React from 'react';
import NoPaddingGrid from './NoPaddingGrid';

interface IGrid2Props {
  left: React.ReactNode;
  right: React.ReactNode;
  gridProps?: any;
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
const Grid2: React.FC<IGrid2Props> = ({ left, right, gridProps }) => {
  return (
    <NoPaddingGrid {...gridProps}>
      <Cell overrides={cellOverrideLeft} span={[2, 4, 6]}>
        {left}
      </Cell>
      <Cell overrides={cellOverrideRight} span={[2, 4, 6]}>
        {right}
      </Cell>
    </NoPaddingGrid>
  );
};
export default Grid2;
