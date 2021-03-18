import Button from '@components/Button';
import Table from '@components/table/Table';
import TransactionLink from '@components/TransactionLink';
import { StyledLink } from 'baseui/link';
import { IMaterial, ITransport } from 'interface';
import Link from 'next/link';
import React from 'react';
import ViewButton from '../../../../components/table/ViewMaterialButton';
interface ITransportsTableProps {
  transports: ITransport[];
  isLoading?: boolean;
}
const TransportsTable: React.FC<ITransportsTableProps> = ({
  isLoading,
  transports,
}) => {
  return (
    <Table
      isLoading={isLoading}
      columns={['ID', 'Name', 'Code', 'Create Transaction', 'Action']}
      data={transports.map((e) => [
        e.materialTokenId,
        e.name,
        e.code,
        <TransactionLink>
          {e.events.MaterialCreate.transactionHash}
        </TransactionLink>,
        <ViewButton id={e.materialTokenId} baseUrl="/transport" />,
      ])}
      emptyMessage={
        <Link href="/transport/create">
          <StyledLink animateUnderline href="#">
            Create a new transport
          </StyledLink>
        </Link>
      }
    />
  );
};

export default TransportsTable;
