import Address from '@components/Address';
import LoadingSkeleton from '@components/loading/LoadingSkeleton';
import VerticalTable from '@components/table/VerticalTable';
import TimeIndicator from '@components/TimeIndicator';
import TransactionLink from '@components/TransactionLink';
import CertificateAssignmentDetailsTable from '@containers/certificate/components/table/CertificateAssignmentDetailsTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStyletron } from 'baseui';
import { Accordion, Panel } from 'baseui/accordion';
import { StyledLink } from 'baseui/link';
import proofchain from 'proofchain';
import { CERTIFICATE_ASSIGNMENT_TYPE } from 'proofchain-library';
import React, { useEffect, useState } from 'react';
import web3Instance from 'web3Instance';

interface ICertificateAssignmentHistoryProps {
  certificateCode?: number;
  materialTokenId?: number;
  companyAddress?: string;
}
const assignmentStyle = {
  [CERTIFICATE_ASSIGNMENT_TYPE.CREATE]: {
    icon: <FontAwesomeIcon icon="link" />,
    label: 'Assigned',
    color: ($theme) => $theme.colors.positive,
  },
  [CERTIFICATE_ASSIGNMENT_TYPE.CANCEL]: {
    icon: <FontAwesomeIcon icon="history" />,
    label: 'Canceled',
    color: ($theme) => $theme.colors.warning,
  },
  [CERTIFICATE_ASSIGNMENT_TYPE.REVOKE]: {
    icon: <FontAwesomeIcon icon="ban" />,
    label: 'Revoked',
    color: ($theme) => $theme.colors.negative,
  },
};
const CertificateAssignmentHistory: React.FC<ICertificateAssignmentHistoryProps> = ({
  certificateCode,
  materialTokenId,
  companyAddress,
}) => {
  const [css, theme] = useStyletron();
  const [history, setHistory] = useState(null);
  useEffect(() => {
    (async () => {
      let fetchedHistory = [];
      if (companyAddress) {
        fetchedHistory = (
          await proofchain().company.certificateAssignmentHistory({
            companyAddress,
            certificateCode,
          })
        )[certificateCode];
      } else if (materialTokenId) {
        fetchedHistory = (
          await proofchain().material.certificateAssignmentHistory({
            materialTokenId,
            certificateCode,
          })
        )[certificateCode];
      }

      const historyWithBlocks = await Promise.all(
        fetchedHistory.map(async (e) => ({
          ...e,
          block: await web3Instance().eth.getBlock(e.event.event.blockNumber),
          certificateInstance: await proofchain().material.getCertificateInstance(
            e.event.certificateInstanceId
          ),
        }))
      );
      setHistory(historyWithBlocks.reverse());
    })();
  }, []);
  if (!history) return <LoadingSkeleton />;
  const assignedToItem = e => (companyAddress ? 
    { 'Assigned Company Address': (
                    e.event.companyAddress
                )
  } : { 'Assigned Material Id': (
                 e.event.materialTokenId
                )})
  return (
    <>
      <Accordion>
        {history.map((e, i) => (
          <Panel
            title={
              <div>
                <span
                  className={css({
                    marginRight: theme.sizing.scale200,
                    color: assignmentStyle[e.type].color(theme),
                  })}
                >
                  {assignmentStyle[e.type].icon}
                </span>
                {assignmentStyle[e.type].label} -{' '}
                <TimeIndicator>{e.block.timestamp}</TimeIndicator>
              </div>
            }
          >
            <VerticalTable
              withTransactionDetails={e.event.event.transactionHash}
              items={{
                'Certificare Instance Id': e.event.certificateInstanceId,
               ...assignedToItem(e),
                Stake:
                  web3Instance().utils.fromWei(
                    e.certificateInstance.stake,
                    'ether'
                  ) + ' ETH',
                Time: <TimeIndicator>{e.block.timestamp}</TimeIndicator>,
                Creator: <Address>{e.event.event.address}</Address>,
                Transaction: (
                  <TransactionLink>
                    {e.event.event.transactionHash}
                  </TransactionLink>
                ),
              }}
            />
          </Panel>
        ))}
      </Accordion>
    </>
  );
};
export default CertificateAssignmentHistory;
