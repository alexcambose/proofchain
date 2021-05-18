import AddressEntityInfo from '@components/AddressEntityInfo';
import Table from '@components/table/Table';
import ViewButton from '@components/table/ViewMaterialButton';
import CertificateTypeTag from '@components/tag/CertificareTypeTag';
import { StyledLink } from 'baseui/link';
import { ICertificate, ICertificateInstance } from 'interface';
import Link from 'next/link';
import React from 'react';
import Web3 from 'web3';
interface ICertificatesTableProps {
  certificates: {
    certificate: ICertificate;
    certificateInstance: ICertificateInstance;
  }[];
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
        'Stake',
        'Certificate Authority',
        'Action',
      ]}
      data={certificates.map((e) => [
        e.certificate.code,
        e.certificate.name,
        e.certificate.description,
        <CertificateTypeTag type={e.certificate.ctype} />,
        // <TransactionLink>
        //   {e.events.CertificateAuthorityCertificateCreated.transactionHash}
        // </TransactionLink>,
        Web3.utils.fromWei(String(e.certificateInstance.stake), 'ether') +
          ' ETH',
        <AddressEntityInfo isCertificateAuthority>
          {e.certificate.certificateAuthority}
        </AddressEntityInfo>,

        <ViewButton id={e.certificate.code} baseUrl="/certificate" />,
      ])}
      emptyMessage="
           No certificates
      "
    />
  );
};

export default CertificatesTable;
