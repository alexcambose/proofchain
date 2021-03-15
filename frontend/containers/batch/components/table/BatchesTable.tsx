import Button from '@components/Button';
import Table from '@components/table/Table';
import ViewButton from '@components/table/ViewMaterialButton';
import TransactionLink from '@components/TransactionLink';
import { StyledLink } from 'baseui/link';
import { IBatch, IMaterial } from 'interface';
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
        'Amount',
        'Create Transaction',
        'Action',
      ]}
      data={batches.map((e) => [
        e.batchId,
        e.code,
        e.materialTokenId,
        e.materialTokenAmount,
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
