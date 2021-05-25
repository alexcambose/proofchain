import AccordionEventPanel from '@components/AccordionEventPanel';
import LoadingSkeleton from '@components/loading/LoadingSkeleton';
import Tabs from '@components/tab/Tabs';
import VerticalTable from '@components/table/VerticalTable';
import TimeIndicator from '@components/TimeIndicator';
import TransactionLink from '@components/TransactionLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getMaterialById } from '@utils/cachable';
import { useStyletron } from 'baseui';
import { Accordion } from 'baseui/accordion';
import { ORIENTATION } from 'baseui/tabs-motion';
import proofchain from 'proofchain';
import { EMPTY_ADDRESS } from 'proofchain-library/src/utils/eth';
import * as React from 'react';
import { useEffect, useState } from 'react';

interface IClientBatchInfoProps {
  historyItem: any;
}
enum BatchEventType {
  CREATE,
  TRANSFER,
  DESTROY,
}
const ClientBatchInfo: React.FunctionComponent<IClientBatchInfoProps> = ({
  historyItem,
}) => {
  const [css, theme] = useStyletron();
  const [batchMaterial, setBatchMaterial] = useState(null);
  const { batchInstance, createEvent, material } = historyItem;
  const [historyEvents, setHistoryEvents] = useState(null);
  useEffect(() => {
    const events = [];
    events.push({
      type: BatchEventType.CREATE,
      event: createEvent,
    });
    (async () => {
      setBatchMaterial(await getMaterialById(batchInstance.materialTokenId));
      const transferEvents: any = await proofchain().batch.getPastEvents(
        'BatchTransfer',
        { batchId: batchInstance.batchId },
        true
      );
      for (let transferEvent of transferEvents) {
        if (
          transferEvent.from !== EMPTY_ADDRESS &&
          transferEvent.to !== EMPTY_ADDRESS
        ) {
          events.push({
            event: transferEvent,
            type: BatchEventType.TRANSFER,
          });
        }
        if (
          transferEvent.from !== EMPTY_ADDRESS &&
          transferEvent.to === EMPTY_ADDRESS
        ) {
          events.push({
            event: transferEvent,
            type: BatchEventType.DESTROY,
          });
        }
      }

      setHistoryEvents(events);
    })();
  }, []);
  const headerConfig = {
    [BatchEventType.CREATE]: {
      title: 'Create',
      icon: <FontAwesomeIcon icon="plus" />,
      color: theme.colors.positive,
      details: (event) => (
        <VerticalTable
          withTransactionDetails={event.event.transactionHash}
          items={{
            'Batch Id': event.batchId,
            'Material Token ID': event.materialTokenId,
            'Created material uuids': event.uuids.join(', '),
            'Transaction Hash': (
              <TransactionLink>{event.event.transactionHash}</TransactionLink>
            ),
            Created: <TimeIndicator>{event.block.timestamp}</TimeIndicator>,
          }}
        />
      ),
    },
    [BatchEventType.TRANSFER]: {
      title: 'Transfer',
      icon: <FontAwesomeIcon icon="truck" />,
      color: theme.colors.accent,
      details: (event) => (
        <VerticalTable
          withTransactionDetails={event.event.transactionHash}
          items={{
            'Batch Id': event.batchId,
            From: event.from,
            To: event.to,
            'Transport Id': event.transportId,
            'Transaction Hash': (
              <TransactionLink>{event.event.transactionHash}</TransactionLink>
            ),
            Created: <TimeIndicator>{event.block.timestamp}</TimeIndicator>,
          }}
        />
      ),
    },
    [BatchEventType.DESTROY]: {
      title: 'Destroy',
      icon: <FontAwesomeIcon icon="plus" />,
      color: theme.colors.negative,
      details: (event) => (
        <VerticalTable
          withTransactionDetails={event.event.transactionHash}
          items={{
            'Batch Id': event.batchId,
            'Transaction Hash': (
              <TransactionLink>{event.event.transactionHash}</TransactionLink>
            ),
            Created: <TimeIndicator>{event.block.timestamp}</TimeIndicator>,
          }}
        />
      ),
    },
  };
  return (
    <Tabs
      orientation={ORIENTATION.vertical}
      tabs={[
        {
          title: 'Information',
          content: (
            <VerticalTable
              withTransactionDetails={createEvent.event.transactionHash}
              items={{
                Id: batchInstance.batchId,
                Code: batchInstance.code,
                'Current owner': batchInstance.owner,
                'Contains material': batchMaterial && batchMaterial.name,
                'Current materials uuid': batchInstance.materialsUuid.length
                  ? batchInstance.materialsUuid.join(', ')
                  : '-',
                Created: (
                  <TimeIndicator>{createEvent.block.timestamp}</TimeIndicator>
                ),
                'Create Event': (
                  <TransactionLink>
                    {createEvent.event.transactionHash}
                  </TransactionLink>
                ),
              }}
            />
          ),
        },
        {
          title: 'History',
          content: (
            <Accordion>
              {!historyEvents ? (
                <LoadingSkeleton />
              ) : (
                historyEvents.map((historyEvent) => (
                  <AccordionEventPanel
                    title={headerConfig[historyEvent.type].title}
                    icon={headerConfig[historyEvent.type].icon}
                    iconColor={headerConfig[historyEvent.type].color}
                    timestamp={historyEvent.event.block.timestamp}
                  >
                    {headerConfig[historyEvent.type].details(
                      historyEvent.event
                    )}
                  </AccordionEventPanel>
                ))
              )}
            </Accordion>
          ),
        },
      ]}
    />
  );
};

export default ClientBatchInfo;
