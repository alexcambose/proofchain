import Table from '@components/table/Table';
import TransactionLink from '@components/TransactionLink';
import { IMaterialInfo, IMaterialTransfer } from 'interface';
import React from 'react';
interface IMaterialInventoryTableProps {
  materialInfo: IMaterialInfo[];
  isLoading?: boolean;
}
const MaterialInventoryTable: React.FC<IMaterialInventoryTableProps> = ({
  isLoading,
  materialInfo,
}) => {
  return (
    <Table
      title="Your materials"
      isLoading={isLoading}
      columns={['UUID', 'Material ID', 'Mint Transaction']}
      data={materialInfo.map((e) => [
        e.uuid,
        e.materialTokenId,
        <TransactionLink>{e.mintEvent.event.transactionHash}</TransactionLink>,
      ])}
      emptyMessage={'No transfers'}
    />
  );
};

export default MaterialInventoryTable;