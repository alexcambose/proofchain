import Button from '@components/Button';
import Table from '@components/table/Table';
import TransactionLink from '@components/TransactionLink';
import { StyledLink } from 'baseui/link';
import { IMaterial, ITransport } from 'interface';
import Link from 'next/link';
import React from 'react';
import ViewButton from '../../../../components/table/ViewMaterialButton';
interface IIncomingTransportsTableeProps {
  transports: ITransport[];
  isLoading?: boolean;
}
const IncomingTransportsTable: React.FC<IIncomingTransportsTableeProps> = ({
  isLoading,
  transports,
}) => {
  return (
    <Table
      isLoading={isLoading}
      columns={['From', 'Batch ids', 'Status', 'Create Transaction', 'Action']}
      data={transports.map((e) => [
        e.sender,
        e.batchIds,
        e.status,
        // <TransactionLink>
        //   {e.event}
        // </TransactionLink>,
        // <ViewButton id={e.materialTokenId} baseUrl="/transport" />,
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

export default IncomingTransportsTable;
