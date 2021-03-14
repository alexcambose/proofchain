import { Table as BaseUiTable, TableProps } from 'baseui/table-semantic';
import React from 'react';
import TableLoadingSkeleton from './TableLoadingSkeleton';

interface ITableProps extends TableProps {}
const Table: React.FC<ITableProps> = ({ ...props }) => {
  return <BaseUiTable loadingMessage={<TableLoadingSkeleton />} {...props} />;
};
export default Table;
