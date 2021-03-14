import TableLoadingSkeleton from '@components/table/TableLoadingSkeleton';
import { StyledLink } from 'baseui/link';
import { Table } from 'baseui/table-semantic';
import { IMaterial } from 'interface';
import Link from 'next/link';
import React from 'react';
interface IMaterialsTableProps {
  materials: IMaterial[];
  loading?: boolean;
}
const MaterialsTable: React.FC<IMaterialsTableProps> = ({
  loading,
  materials,
}) => {
  return (
    <Table
      loadingMessage={<TableLoadingSkeleton />}
      isLoading={loading}
      columns={['ID', 'Name', 'Code', 'Create Transaction']}
      data={materials.map((e) => [e.materialTokenId, e.name, e.code])}
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
