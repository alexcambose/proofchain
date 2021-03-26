import MaterialUuidQrModal from '@components/MaterialUuidQrModal';
import Table from '@components/table/Table';
import TransactionLink from '@components/TransactionLink';
import { IMaterialInfo, IMaterialTransfer } from 'interface';
import React from 'react';
interface IMaterialInventoryTableProps {
  materialInfo: IMaterialInfo[];
  isLoading?: boolean;
  header?: string;
}
const MaterialInventoryTable: React.FC<IMaterialInventoryTableProps> = ({
  isLoading,
  materialInfo,
  header = 'Your materials',
}) => {
  return (
    <Table
      title={header}
      isLoading={isLoading}
      columns={['UUID', 'Material ID', 'Mint Transaction']}
      data={materialInfo.map((e) => [
        <>
          <MaterialUuidQrModal materialUuid={e.uuid} />
          {e.uuid}
        </>,
        e.materialTokenId,
        <TransactionLink>{e.mintEvent.event.transactionHash}</TransactionLink>,
      ])}
      emptyMessage={'No materials'}
    />
  );
};

export default MaterialInventoryTable;
