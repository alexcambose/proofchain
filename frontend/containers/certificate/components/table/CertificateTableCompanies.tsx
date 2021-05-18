import Button, { ButtonColorStyle } from '@components/Button';
import Table from '@components/table/Table';
import CompanyEntityTypeTag from '@components/tag/CompanyEntityTypeTag';
import TimeIndicator from '@components/TimeIndicator';
import TransactionLink from '@components/TransactionLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonGroup, SIZE } from 'baseui/button-group';
import { StyledLink } from 'baseui/link';
import { ICertificate, ICertificateInstance, ICompany } from 'interface';
import Link from 'next/link';
import React from 'react';
import web3Instance from 'web3Instance';
import CancelCertificateButton from '../view/CancelCertificateButton';
interface ICertificateTableCompaniesProps {
  certificateCode: number;
  info: {
    company: ICompany;
    certificateInstance: ICertificateInstance;
    assignEvent: any;
    assignTime: number;
  }[];
  isLoading?: boolean;
}
const CertificateTableCompanies: React.FC<ICertificateTableCompaniesProps> = ({
  isLoading,
  certificateCode,
  info,
}) => {
  return (
    <Table
      isLoading={isLoading}
      columns={[
        'Company name',
        'Company type',
        'Stake',
        'Time',
        'Transaction',
        'Actions',
      ]}
      data={info.map((e) => [
        e.company.name,
        <CompanyEntityTypeTag entityType={e.company.entityType} />,
        web3Instance() &&
          web3Instance().utils.fromWei(e.certificateInstance.stake, 'ether') +
            ' ETH',
        <TimeIndicator>{e.assignTime}</TimeIndicator>,
        <TransactionLink>
          {e.assignEvent.event.transactionHash}
        </TransactionLink>,
        <CancelCertificateButton
          certificateCode={certificateCode}
          companyAddress={e.assignEvent.companyAddress}
        />,
      ])}
      emptyMessage={
        <Link href={`/certificate/assign?certificateCode=${certificateCode}`}>
          <StyledLink animateUnderline href="#">
            Assign this certificate to a company
          </StyledLink>
        </Link>
      }
    />
  );
};

export default CertificateTableCompanies;
