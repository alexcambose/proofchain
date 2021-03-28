import React, { useEffect, useState } from 'react';
import { StatefulTabs, Tab, ORIENTATION } from 'baseui/tabs-motion';
import {
  ICertificate,
  ICertificateAuthority,
  ICertificateInstance,
} from 'interface';

import Address from '@components/Address';
import VerticalTable from '@components/table/VerticalTable';
import { StyledLink } from 'baseui/link';
import web3Instance from 'web3Instance';
import TimeIndicator from '@components/TimeIndicator';
import TransactionLink from '@components/TransactionLink';
import proofchain from 'proofchain';
import LoadingSkeleton from '@components/loading/LoadingSkeleton';
import CertificateHistoryAccordion from './CertificateHistoryAccordion';
import CertificateAssignmentDetailsTable from '@containers/certificate/components/table/CertificateAssignmentDetailsTable';
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
    <StatefulTabs renderAll orientation={ORIENTATION.vertical}>
      <Tab title="Assignment details">
        <CertificateAssignmentDetailsTable
          certificateInstance={certificateInfo.certificateInstance}
          assignEvent={certificateInfo.assignEvent}
        />
      </Tab>
      <Tab title="Certificate Info">
        <CertificateInfo
          certificate={certificateInfo.certificate}
          assignEvent={certificateInfo.assignEvent}
        />
      </Tab>
      <Tab title="History">
        <CertificateHistoryAccordion
          certificateCode={certificateInfo.assignEvent.certificateCode}
          materialTokenId={certificateInfo.assignEvent.materialTokenId}
        />
      </Tab>
      <Tab title="Certificate Authority">
        <CertificateAuthorityDetails
          certificateAuthority={certificateInfo.certificateAuthority}
        />
      </Tab>
    </StatefulTabs>
  );
};

export default CertificateInformationTabs;
