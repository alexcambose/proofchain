import MaterialLink from '@components/MaterialLink';
import MaterialsUuidTags from '@components/tag/MaterialsUUidTags';
import Table from '@components/table/Table';
import { IBatch } from 'interface';
import React from 'react';
interface ITransportBatchesTableProps {
  transportbatches: IBatch[];
}
const TransportBatchesTable: React.FC<ITransportBatchesTableProps> = ({
  transportbatches,
}) => {
  return (
    <Table
      columns={['Batch Id', 'Batch Code', 'Material Id', 'Material Uuids']}
      data={transportbatches.map((e) => [
        e.batchId,
        e.code,
        <MaterialLink>{e.materialTokenId}</MaterialLink>,
        <MaterialsUuidTags uuids={e.materialsUuid} />,
      ])}
    />
  );
};

export default TransportBatchesTable;
