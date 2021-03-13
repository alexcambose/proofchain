import TableLoadingSkeleton from '@components/TableLoadingSkeleton';
import { Table } from 'baseui/table-semantic';
import { IMaterial } from 'interface';
import React from 'react';
interface IMaterialsTableProps {
  materials: IMaterial[];
  loading?: boolean;
}
const RawMaterialsTable: React.FC<IMaterialsTableProps> = ({
  loading,
  materials,
}) => {
  return (
    <Table
      loadingMessage={<TableLoadingSkeleton />}
      isLoading={loading}
      columns={['Name', 'Code']}
      data={materials.map((e) => [e.name, e.code])}
    />
  );
};

export default RawMaterialsTable;
