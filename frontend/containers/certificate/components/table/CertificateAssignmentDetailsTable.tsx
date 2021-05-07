import LoadingSkeleton from '@components/loading/LoadingSkeleton';
import VerticalTable from '@components/table/VerticalTable';
import TimeIndicator from '@components/TimeIndicator';
import TransactionLink from '@components/TransactionLink';
import { StyledLink } from 'baseui/link';
import { ICertificateInstance } from 'interface';
import proofchain from 'proofchain';
import React, { useEffect, useState } from 'react';
import web3Instance from 'web3Instance';
interface ICertificateAssignmentDetailsTableProps {
  assignEvent: any;
  certificateInstance: ICertificateInstance;
}
const CertificateAssignmentDetailsTable: React.FC<ICertificateAssignmentDetailsTableProps> = ({
  assignEvent,
  certificateInstance,
}) => {
  return (
    <VerticalTable
      withTransactionDetails={assignEvent.event.transactionHash}
      items={{
        'Material Id': (
          <StyledLink
            target="_blank"
            href={`/material/${assignEvent.materialTokenId}`}
          >
            {assignEvent.materialTokenId}
          </StyledLink>
        ),
        Stake:
          web3Instance().utils.fromWei(certificateInstance.stake, 'ether') +
          ' ETH',
        Time: <TimeIndicator>{assignEvent.block.timestamp}</TimeIndicator>,
        Transaction: (
          <TransactionLink>{assignEvent.event.transactionHash}</TransactionLink>
        ),
      }}
    />
  );
};
export default CertificateAssignmentDetailsTable;
