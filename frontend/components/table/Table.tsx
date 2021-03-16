import { Search } from 'baseui/icon';
import { Input } from 'baseui/input';
import { BEHAVIOR, Cell, Grid } from 'baseui/layout-grid';
import {
  StyledTableBodyCell,
  Table as BaseUiTable,
  TableBuilder,
  TableBuilderColumn,
  TableProps,
} from 'baseui/table-semantic';
import React, { useState } from 'react';
import TableLoadingSkeleton from './TableLoadingSkeleton';

interface ITableProps extends TableProps {
  withSearch?: boolean;
}
const cellOverride = {
  Cell: {
    style: ({ $theme }) => ({
      paddingLeft: '0 !important',
      paddingRight: '0 !important',
    }),
  },
};
const Table: React.FC<ITableProps> = ({
  data,
  columns,
  withSearch = false,
  ...props
}) => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <>
      {withSearch && (
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
          <Cell span={[4, 4, 4]} skip={[0, 4, 8]} overrides={cellOverride}>
            <Input
              value={searchValue}
              overrides={{
                Root: {
                  style: ({ $theme }) => ({
                    marginBottom: $theme.sizing.scale200,
                  }),
                },
              }}
              onChange={(e) => {
                // @ts-ignore
                setSearchValue(e.target.value);
              }}
              placeholder="Search..."
              clearOnEscape
              clearable
              startEnhancer={<Search size="18px" />}
            />
          </Cell>
        </Grid>
      )}
      <TableBuilder
        loadingMessage={<TableLoadingSkeleton />}
        overrides={{
          TableBodyCell: {
            style: ({ $theme }) => ({
              verticalAlign: 'middle',
            }),
          },
          TableBodyRow: {
            style: ({ $theme, $rowIndex }: any) => ({
              backgroundColor:
                $rowIndex % 2
                  ? $theme.colors.backgroundPrimary
                  : $theme.colors.backgroundSecondary,
              ':hover': {
                backgroundColor: $theme.colors.backgroundTertiary,
              },
            }),
          },
        }}
        data={data}
        {...props}
      >
        {columns.map((e, i) => (
          <TableBuilderColumn header={columns[i]}>
            {(row) => row[i]}
          </TableBuilderColumn>
        ))}
      </TableBuilder>
    </>
  );
};
export default Table;
