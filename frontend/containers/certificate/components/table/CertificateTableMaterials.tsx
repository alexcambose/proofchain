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
interface ICertificateTableMaterialsProps {
  info: {
    material: IMaterial;
    certificateInstance: ICertificateInstance;
    assignEvent: any;
  }[];
  isLoading?: boolean;
}
const CertificateTableMaterials: React.FC<ICertificateTableMaterialsProps> = ({
  isLoading,
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
        web3Instance().utils.fromWei(e.certificateInstance.stake, 'ether') +
          ' ETH',
        <TimeIndicator>{e.certificateInstance.time}</TimeIndicator>,
        <TransactionLink>
          {e.assignEvent.event.transactionHash}
        </TransactionLink>,
        <Button size={SIZE.mini} colorStyle={ButtonColorStyle.DANGER}>
          <FontAwesomeIcon icon="times" /> Cancel
        </Button>,
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

export default CertificateTableMaterials;
