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
import { Display4 } from 'baseui/typography';
import React, { useEffect, useMemo, useState } from 'react';
import ItemsPerPageIndicator from './ItemsPerPageIndicator';
import TableLoadingSkeleton from './TableLoadingSkeleton';
import { Pagination } from 'baseui/pagination';
import Fuse from 'fuse.js';
import pluralize from 'pluralize';
import { styled } from 'baseui';
interface ITableProps extends TableProps {
  withSearch?: boolean;
  title?: string;
  withPagination?: boolean;
}
const cellOverride = {
  Cell: {
    style: ({ $theme }) => ({
      paddingLeft: '0 !important',
      paddingRight: '0 !important',
    }),
  },
};
const gridOverride = {
  Grid: {
    style: ({ $theme }) => ({
      paddingLeft: '0 !important',
      paddingRight: '0 !important',
    }),
  },
};
const PaginationContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});
const PaginationLabel = styled('span', ({ $theme }) => ({
  ...$theme.typography.ParagraphSmall,
}));
const Table: React.FC<ITableProps> = ({
  data,
  columns,
  withSearch,
  withPagination = false,
  title,
  ...props
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const filteredData = useMemo(() => {
    return data.filter((arrayOfData) => {
      if (withSearch && searchValue) {
        const fuse = new Fuse(
          arrayOfData.filter((e) => typeof e === 'string'),
          { includeScore: true, threshold: 0.5 }
        );
        return fuse.search(searchValue).length;
      }
      return 1;
    });
  }, [searchValue, data, perPage, currentPage]);
  const computedData = useMemo(() => {
    return filteredData.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage
    );
  }, [searchValue, filteredData, perPage, currentPage]);
  useEffect(() => {
    if (currentPage !== 1) setCurrentPage(1);
  }, [perPage, searchValue]);
  return (
    <>
      {title && <Display4>{title}</Display4>}
      {withSearch && (
        <Grid behavior={BEHAVIOR.fluid} overrides={gridOverride}>
          <Cell span={[2, 2, 2]} overrides={cellOverride}>
            {withPagination && (
              <ItemsPerPageIndicator perPage={perPage} onChange={setPerPage} />
            )}
          </Cell>
          <Cell span={[4, 4, 4]} skip={[0, 2, 6]} overrides={cellOverride}>
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
        data={computedData}
        {...props}
      >
        {columns.map((e, i) => (
          <TableBuilderColumn key={i} header={columns[i]}>
            {(row) => row[i]}
          </TableBuilderColumn>
        ))}
      </TableBuilder>
      {withPagination && (
        <PaginationContainer>
          <PaginationLabel>
            Showing {perPage * (currentPage - 1)} to{' '}
            {Math.min(perPage * currentPage, filteredData.length)} out of{' '}
            {pluralize('entry', filteredData.length, true)}
          </PaginationLabel>
          <Pagination
            overrides={{
              Root: {
                style: ({ $theme }) => ({
                  marginTop: $theme.sizing.scale300,
                }),
              },
            }}
            numPages={Math.ceil(filteredData.length / perPage)}
            currentPage={currentPage}
            onPageChange={({ nextPage }) => {
              setCurrentPage(nextPage);
            }}
          />
        </PaginationContainer>
      )}
    </>
  );
};
export default Table;
