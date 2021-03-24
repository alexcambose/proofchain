import Button from '@components/Button';
import Table from '@components/table/Table';
import ViewButton from '@components/table/ViewMaterialButton';
import { Tag } from 'baseui/tag';
import TransactionLink from '@components/TransactionLink';
import { StyledLink } from 'baseui/link';
import { IBatch, ICertificate, IMaterial } from 'interface';
import Link from 'next/link';
import React from 'react';
import MaterialLink from '@components/MaterialLink';
interface ICertificatesTableProps {
  certificates: ICertificate[];
  isLoading?: boolean;
}
const CertificatesTable: React.FC<ICertificatesTableProps> = ({
  isLoading,
  certificates,
}) => {
  return (
    <Table
      isLoading={isLoading}
      columns={['Code', 'Name', 'Description', 'Create Transaction', 'Action']}
      data={certificates.map((e) => [
        e.code,
        e.name,
        e.description,
        <TransactionLink>
          {e.events.CertificateAuthorityCertificateCreated.transactionHash}
        </TransactionLink>,
        <ViewButton id={e.code} baseUrl="/certificate" />,
      ])}
      emptyMessage={
        <Link href="/certificate/create">
          <StyledLink animateUnderline href="#">
            Create a new certificate
          </StyledLink>
        </Link>
      }
    />
  );
};

export default CertificatesTable;