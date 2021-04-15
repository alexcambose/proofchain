import Address from '@components/Address';
import LoadingSkeleton from '@components/loading/LoadingSkeleton';
import Tabs from '@components/tab/Tabs';
import VerticalTable from '@components/table/VerticalTable';
import TimeIndicator from '@components/TimeIndicator';
import TransactionLink from '@components/TransactionLink';
import CertificateAssignmentDetailsTable from '@containers/certificate/components/table/CertificateAssignmentDetailsTable';
import { ORIENTATION } from 'baseui/tabs-motion';
import {
  ICertificate,
  ICertificateAuthority,
  ICertificateInstance,
} from 'interface';
import proofchain from 'proofchain';
import React, { useEffect, useState } from 'react';
import web3Instance from 'web3Instance';
import CertificateHistoryAccordion from './CertificateHistoryAccordion';

interface CertificateInformationTabs {
  certificateInfo: {
    certificate: ICertificate;
    certificateInstance: ICertificateInstance;
    certificateAuthority: ICertificateAuthority;
    assignEvent: any;
  };
}
interface ICertificateInfoProps {
  assignEvent: any;
  certificate: ICertificate;
}
const CertificateInfo: React.FC<ICertificateInfoProps> = ({
  assignEvent,
  certificate,
}) => {
  const [certificateCreatedEvent, setCertificateCreatedEvent] = useState(null);
  const [eventBlock, setEventBlock] = useState(null);
  useEffect(() => {
    (async () => {
      const events = await proofchain().certificateAuthority.getPastEvents(
        'CertificateAuthorityCertificateCreated'
      );
      const [event] = events;
      setCertificateCreatedEvent(event);
      // @ts-ignore
      setEventBlock(await web3Instance().eth.getBlock(event.event.blockNumber));
    })();
  }, []);
  if (!eventBlock) return <LoadingSkeleton />;
  return (
    <VerticalTable
      items={{
        Name: certificate.name,
        Description: certificate.description,
        Code: certificate.code,
        'Certificate Authority Address': (
          <Address>{assignEvent.certificateAuthority}</Address>
        ),
        Created: <TimeIndicator>{eventBlock.timestamp}</TimeIndicator>,
        'Create Transaction': (
          <TransactionLink>
            {certificateCreatedEvent.event.transactionHash}
          </TransactionLink>
        ),
      }}
    />
  );
};
interface IcertificateAuthorityDetailsProps {
  certificateAuthority: ICertificateAuthority;
}
const CertificateAuthorityDetails: React.FC<IcertificateAuthorityDetailsProps> = ({
  certificateAuthority,
}) => {
  const [createEvent, setCreateEvent] = useState(null);
  const [eventBlock, setEventBlock] = useState(null);
  useEffect(() => {
    (async () => {
      const events = await proofchain().certificateAuthority.getPastEvents(
        'CertificateAuthorityCreated'
      );
      const [event] = events;
      setCreateEvent(event);
      // @ts-ignore
      setEventBlock(await web3Instance().eth.getBlock(event.blockNumber));
    })();
  }, []);
  if (!eventBlock) return <LoadingSkeleton />;
  return (
    <VerticalTable
      withTransactionDetails={createEvent.event.transactionHash}
      items={{
        Name: certificateAuthority.name,
        Address: certificateAuthority.owner,
        Created: <TimeIndicator>{eventBlock.timestamp}</TimeIndicator>,
        Status: certificateAuthority.disabled ? 'Disabled' : 'Enabled',
        'Create Transaction': (
          <TransactionLink>{createEvent.event.transactionHash}</TransactionLink>
        ),
      }}
    />
  );
};

const CertificateInformationTabs: React.FC<CertificateInformationTabs> = ({
  certificateInfo,
}) => {
  return (
    <Tabs
      renderAll
      tabs={[
        {
          title: 'Assignment details',
          content: (
            <CertificateAssignmentDetailsTable
              certificateInstance={certificateInfo.certificateInstance}
              assignEvent={certificateInfo.assignEvent}
            />
          ),
        },
        {
          title: 'Certificate Info',
          content: (
            <CertificateInfo
              certificate={certificateInfo.certificate}
              assignEvent={certificateInfo.assignEvent}
            />
          ),
        },
        {
          title: 'History',
          content: (
            <CertificateHistoryAccordion
              certificateCode={certificateInfo.assignEvent.certificateCode}
              materialTokenId={certificateInfo.assignEvent.materialTokenId}
            />
          ),
        },
        {
          title: 'Certificate Authority',
          content: (
            <CertificateAuthorityDetails
              certificateAuthority={certificateInfo.certificateAuthority}
            />
          ),
        },
      ]}
      orientation={ORIENTATION.vertical}
    />
  );
};

export default CertificateInformationTabs;
