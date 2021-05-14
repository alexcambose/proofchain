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
import CertificateTypeTag from '@components/tag/CertificareTypeTag';
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
      withSearch
      withPagination
      isLoading={isLoading}
      columns={[
        'Code',
        'Name',
        'Description',
        'Type',
        'Created Transaction',
        'Action',
      ]}
      data={certificates.map((e) => [
        e.code,
        e.name,
        e.description,
        <CertificateTypeTag type={e.ctype} />,
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
