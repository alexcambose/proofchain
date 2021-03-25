import Address from '@components/Address';
import LoadingSkeleton from '@components/LoadingSkeleton';
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

interface ICertificateHistoryAccordionProps {
  certificateCode?: number;
  materialTokenId: number;
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
const CertificateHistoryAccordion: React.FC<ICertificateHistoryAccordionProps> = ({
  certificateCode,
  materialTokenId,
}) => {
  const [css, theme] = useStyletron();
  const [history, setHistory] = useState(null);
  useEffect(() => {
    (async () => {
      const fetchedHistory = (
        await proofchain().material.certificateAssignmentHistory({
          materialTokenId,
          certificateCode,
        })
      )[certificateCode];

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
  console.log(history);
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
              items={{
                'Certificare Instance Id': e.event.certificateInstanceId,
                'Material Id': (
                  <StyledLink
                    target="_blank"
                    href={`/material/${e.event.materialTokenId}`}
                  >
                    {e.event.materialTokenId}
                  </StyledLink>
                ),
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
export default CertificateHistoryAccordion;
