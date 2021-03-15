import Table from '@components/table/Table';
import TableLoadingSkeleton from '@components/table/TableLoadingSkeleton';
import TransactionLink from '@components/TransactionLink';
import { shortenAddress } from '@utils/eth';
import { StyledLink } from 'baseui/link';
import config from 'config';
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
      isLoading={isLoading}
      columns={['ID', 'Name', 'Code', 'Create Transaction', 'Action']}
      data={materials.map((e) => [
        e.materialTokenId,
        e.name,
        e.code,
        <TransactionLink>
          {e.events.MaterialCreate.transactionHash}
        </TransactionLink>,
        <ViewButton id={e.materialTokenId} baseUrl="/material" />,
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
