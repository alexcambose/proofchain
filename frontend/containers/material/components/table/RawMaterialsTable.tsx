import Table from '@components/table/Table';
import TransactionLink from '@components/TransactionLink';
import { StyledLink } from 'baseui/link';
import { IMaterial } from 'interface';
import Link from 'next/link';
import React from 'react';
import ViewButton from '../../../../components/table/ViewMaterialButton';
interface IMaterialsTableProps {
  materials: IMaterial[];
  isLoading?: boolean;
}
const RawMaterialsTable: React.FC<IMaterialsTableProps> = ({
  isLoading,
  materials,
}) => {
  return (
    <Table
      withPagination
      withSearch
      isLoading={isLoading}
      columns={['ID', 'Name', 'Code', 'Created Transaction', 'Action']}
      data={materials.map((e) => [
        e.materialTokenId,
        e.name,
        e.code,
        <TransactionLink>
          {e.events.MaterialCreate.transactionHash}
        </TransactionLink>,
        <ViewButton id={e.materialTokenId} baseUrl="/raw-material" />,
      ])}
      emptyMessage={
        <Link href="/raw-material/create">
          <StyledLink animateUnderline href="#">
            Create a new raw material
          </StyledLink>
        </Link>
      }
    />
  );
};

export default RawMaterialsTable;
