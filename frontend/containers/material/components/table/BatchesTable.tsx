import Button from '@components/Button';
import Table from '@components/table/Table';
import TransactionLink from '@components/TransactionLink';
import { StyledLink } from 'baseui/link';
import { IBatch, IMaterial } from 'interface';
import Link from 'next/link';
import React from 'react';
import ViewMaterialButton from './ViewMaterialButton';
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
        <ViewMaterialButton materialTokenId={e.materialTokenId} />,
      ])}
      emptyMessage={
        <Link href="/material/create">
          <StyledLink animateUnderline href="#">
            Create a new material
          </StyledLink>
        </Link>
      }
    />
  );
};

export default BatchesTable;
