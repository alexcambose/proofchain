import MaterialLink from '@components/MaterialLink';
import MaterialsUuidTags from '@components/MaterialsUUidTags';
import Table from '@components/table/Table';
import ViewButton from '@components/table/ViewMaterialButton';
import TransactionLink from '@components/TransactionLink';
import { StyledLink } from 'baseui/link';
import { IBatch } from 'interface';
import Link from 'next/link';
import React from 'react';
interface IBatchesTableProps {
  batches: IBatch[];
  isLoading?: boolean;
}
const BatchesTable: React.FC<IBatchesTableProps> = ({ isLoading, batches }) => {
  return (
    <Table
      isLoading={isLoading}
      columns={[
        'ID',
        'Code',
        'Material Id',
        'Material Uuids',
        'Create Transaction',
        'Action',
      ]}
      data={batches.map((e) => [
        e.batchId,
        e.code,
        <MaterialLink>{e.materialTokenId}</MaterialLink>,
        <MaterialsUuidTags uuids={e.materialsUuid} />,

        <TransactionLink>
          {e.events.BatchCreate.transactionHash}
        </TransactionLink>,
        <ViewButton id={e.materialTokenId} baseUrl="/batch" />,
      ])}
      emptyMessage={
        <Link href="/batch/create">
          <StyledLink animateUnderline href="#">
            Create a new batch
          </StyledLink>
        </Link>
      }
    />
  );
};

export default BatchesTable;
