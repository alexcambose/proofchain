import TableLoadingSkeleton from '@components/table/TableLoadingSkeleton';
import { shortenAddress } from '@utils/eth';
import { StyledLink } from 'baseui/link';
import { Table } from 'baseui/table-semantic';
import config from 'config';
import { IMaterial } from 'interface';
import Link from 'next/link';
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
      columns={['ID', 'Name', 'Code', 'Create Transaction']}
      data={materials.map((e) => [
        e.materialTokenId,
        e.name,
        e.code,
        <StyledLink
          href={`${config.ethProvider.default.etherscan}tx/${e.events.MaterialCreate.transactionHash}`}
        >
          {shortenAddress(e.events.MaterialCreate.transactionHash, 10)}
        </StyledLink>,
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