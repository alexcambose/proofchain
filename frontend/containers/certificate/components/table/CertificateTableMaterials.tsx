import Button, { ButtonColorStyle } from '@components/Button';
import Table from '@components/table/Table';
import TimeIndicator from '@components/TimeIndicator';
import TransactionLink from '@components/TransactionLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonGroup, SIZE } from 'baseui/button-group';
import { StyledLink } from 'baseui/link';
import { ICertificate, ICertificateInstance, IMaterial } from 'interface';
import Link from 'next/link';
import React from 'react';
import web3Instance from 'web3Instance';
import CancelCertificateButton from '../view/CancelCertificateButton';
interface ICertificateTableMaterialsProps {
  certificateCode: number;
  info: {
    material: IMaterial;
    certificateInstance: ICertificateInstance;
    assignEvent: any;
    assignTime: any;
  }[];
  isLoading?: boolean;
}
const CertificateTableMaterials: React.FC<ICertificateTableMaterialsProps> = ({
  isLoading,
  certificateCode,
  info,
}) => {
  return (
    <Table
      isLoading={isLoading}
      columns={[
        'Material Id',
        'Material name',
        'Stake',
        'Time',
        'Transaction',
        'Actions',
      ]}
      data={info.map((e) => [
        e.material.materialTokenId,
        e.material.name,
        web3Instance() &&
          web3Instance().utils.fromWei(e.certificateInstance.stake, 'ether') +
            ' ETH',
        <TimeIndicator>{e.assignTime}</TimeIndicator>,
        <TransactionLink>
          {e.assignEvent.event.transactionHash}
        </TransactionLink>,
        <CancelCertificateButton
          certificateCode={certificateCode}
          materialTokenId={e.material.materialTokenId}
        />,
      ])}
      emptyMessage={
        <Link href={`/certificate/assign?certificateCode=${certificateCode}`}>
          <StyledLink animateUnderline href="#">
            Assign this certificate to a product
          </StyledLink>
        </Link>
      }
    />
  );
};

export default CertificateTableMaterials;
