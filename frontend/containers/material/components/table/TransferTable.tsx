import Table from '@components/table/Table';
import TransactionLink from '@components/TransactionLink';
import { IMaterialTransfer } from 'interface';
import React from 'react';
interface ITransferTableProps {
  transfers: IMaterialTransfer[];
  isLoading?: boolean;
}
const TransferTable: React.FC<ITransferTableProps> = ({
  isLoading,
  transfers,
}) => {
  return (
    <Table
      isLoading={isLoading}
      columns={['From', 'To', 'Amount', 'Hash']}
      data={transfers.map((e) => [
        e.from,
        e.to,
        e.value,
        <TransactionLink>{e.hash}</TransactionLink>,
      ])}
      emptyMessage={'No transfers'}
    />
  );
};

export default TransferTable;
