import Table from '@components/table/Table';
import TimeIndicator from '@components/TimeIndicator';
import TransactionLink from '@components/TransactionLink';
import { KIND, SIZE } from 'baseui/button';
import {
  ICertificate,
  ICertificateAuthority,
  ICertificateInstance,
} from 'interface';
import React from 'react';
import web3Instance from 'web3Instance';
import CertificateDetailsModalButton from '../view/CertificateDetailsModal';
interface IMaterialCertificatesTableProps {
  certificates: [
    {
      certificate: ICertificate;
      certificateInstance: ICertificateInstance;
      certificateAuthority: ICertificateAuthority;
      assignEvent: any;
    }
  ];
}
const MaterialCertificatesTable: React.FC<IMaterialCertificatesTableProps> = ({
  certificates,
}) => {
  console.log(certificates);
  return (
    <Table
      columns={['Name', 'Certificate Authority', 'Stake', 'Time', 'Action']}
      data={certificates.map((e) => [
        e.certificate.name,
        e.certificateAuthority.name,
        web3Instance().utils.fromWei(e.certificateInstance.stake, 'ether') +
          ' ETH',
        <TimeIndicator>{e.assignEvent.block.timestamp}</TimeIndicator>,
        // <TransactionLink>
        //   {e.assignEvent.event.transactionHash}
        // </TransactionLink>,
        <CertificateDetailsModalButton
          certificateInfo={e}
          kind={KIND.secondary}
          size={SIZE.mini}
        >
          View
        </CertificateDetailsModalButton>,
      ])}
      emptyMessage={'No assigned certificates'}
    />
  );
};

export default MaterialCertificatesTable;
