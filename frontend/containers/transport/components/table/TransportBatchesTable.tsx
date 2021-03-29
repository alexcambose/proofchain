import MaterialLink from '@components/MaterialLink';
import Table from '@components/table/Table';
import { Tag } from 'baseui/tag';
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
      columns={['ID', 'Code', 'Material Id', 'Material Uuids']}
      data={transportbatches.map((e) => [
        e.batchId,
        e.code,
        <MaterialLink>{e.materialTokenId}</MaterialLink>,
        e.materialsUuid.map((e) => <Tag closeable={false}>{e}</Tag>),
      ])}
    />
  );
};

export default TransportBatchesTable;
