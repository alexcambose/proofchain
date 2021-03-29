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
  certficates: [
    {
      certificate: ICertificate;
      certificateInstance: ICertificateInstance;
      certificateAuthority: ICertificateAuthority;
      assignEvent: any;
      assignTimestamp: number;
    }
  ];
}
const MaterialCertificatesTable: React.FC<IMaterialCertificatesTableProps> = ({
  certficates,
}) => {
  return (
    <Table
      columns={['Name', 'Certificate Authority', 'Stake', 'Time', 'Action']}
      data={certficates.map((e) => [
        e.certificate.name,
        e.certificateAuthority.name,
        web3Instance().utils.fromWei(e.certificateInstance.stake, 'ether') +
          ' ETH',
        <TimeIndicator>{e.assignTimestamp}</TimeIndicator>,
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
