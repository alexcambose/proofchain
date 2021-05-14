import AddressEntityInfo from '@components/AddressEntityInfo';
import Table from '@components/table/Table';
import ViewButton from '@components/table/ViewMaterialButton';
import TransactionLink from '@components/TransactionLink';
import TransportStatusTag from '@components/tag/TransportStatusTag';
import { StyledLink } from 'baseui/link';
import { ITransport } from 'interface';
import Link from 'next/link';
import React from 'react';
interface IIncomingTransportsTableeProps {
  transports: ITransport[];
  isLoading?: boolean;
  isTransportCompany?: boolean;
}
const IncomingTransportsTable: React.FC<IIncomingTransportsTableeProps> = ({
  isLoading,
  transports,
  isTransportCompany,
}) => {
  const companyTable = (
    <Table
      withSearch
      withPagination
      isLoading={isLoading}
      columns={[
        'Id',
        'Receiver',
        'Transport Company',
        'Batch ids',
        'Status',
        'Created Transaction',
        'Action',
      ]}
      data={transports.map((e) => [
        e.transportId,
        <AddressEntityInfo>{e.receiver}</AddressEntityInfo>,
        <AddressEntityInfo>{e.transportCompany}</AddressEntityInfo>,
        e.batchIds.join(', '),
        <TransportStatusTag transportStatus={e.status} />,
        <TransactionLink>
          {e.events.TransportCreated.transactionHash}
        </TransactionLink>,
        <ViewButton id={e.transportId} baseUrl="/transport" />,
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
  const transportCompanyTable = (
    <Table
      withSearch
      withPagination
      isLoading={isLoading}
      columns={[
        'Id',
        'From',
        'Receiver',
        'Transport Company',
        'Batch ids',
        'Status',
        'Created Transaction',
        'Action',
      ]}
      data={transports.map((e) => [
        e.transportId,
        <AddressEntityInfo>{e.sender}</AddressEntityInfo>,
        <AddressEntityInfo>{e.receiver}</AddressEntityInfo>,
        <AddressEntityInfo>{e.transportCompany}</AddressEntityInfo>,
        e.batchIds.join(', '),
        <TransportStatusTag transportStatus={e.status} />,
        <TransactionLink>
          {e.events.TransportCreated.transactionHash}
        </TransactionLink>,
        <ViewButton id={e.transportId} baseUrl="/transport" />,
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
  return isTransportCompany ? transportCompanyTable : companyTable;
};

export default IncomingTransportsTable;
