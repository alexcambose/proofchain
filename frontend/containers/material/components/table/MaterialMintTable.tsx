import Table from '@components/table/Table';
import TransactionLink from '@components/TransactionLink';
import { IMaterialTransfer } from 'interface';
import React from 'react';
interface IMaterialMintTableProps {
  transfers: IMaterialTransfer[];
  isLoading?: boolean;
}
const MaterialMintTable: React.FC<IMaterialMintTableProps> = ({
  isLoading,
  transfers,
}) => {
  return (
    <Table
      isLoading={isLoading}
      columns={['Amount', 'Hash']}
      data={transfers.map((e) => [
        e.value,
        <TransactionLink>{e.event.transactionHash}</TransactionLink>,
      ])}
      emptyMessage={'No transfers'}
    />
  );
};

export default MaterialMintTable;
