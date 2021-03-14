import Table from '@components/table/Table';
import TransactionLink from '@components/TransactionLink';
import { StyledLink } from 'baseui/link';
import { IMaterial } from 'interface';
import Link from 'next/link';
import React from 'react';
interface IMaterialsTableProps {
  materials: IMaterial[];
  isLoading?: boolean;
}
const MaterialsTable: React.FC<IMaterialsTableProps> = ({
  isLoading,
  materials,
}) => {
  return (
    <Table
      isLoading={isLoading}
      columns={['ID', 'Name', 'Code', 'Create Transaction']}
      data={materials.map((e) => [
        e.materialTokenId,
        e.name,
        e.code,
        <TransactionLink>
          {e.events.MaterialCreate.transactionHash}
        </TransactionLink>,
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

export default MaterialsTable;
