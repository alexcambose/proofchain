import AccordionEventPanel from '@components/AccordionEventPanel';
import LoadingSkeleton from '@components/loading/LoadingSkeleton';
import Tabs from '@components/tab/Tabs';
import VerticalTable from '@components/table/VerticalTable';
import TimeIndicator from '@components/TimeIndicator';
import TransactionLink from '@components/TransactionLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStyletron } from 'baseui';
import { Accordion } from 'baseui/accordion';
import { ORIENTATION } from 'baseui/tabs-motion';
import pluralize from 'pluralize';
import proofchain from 'proofchain';
import * as React from 'react';
import { useEffect, useState } from 'react';
interface IClientMaterialInfoProps {
  historyItem: any;
}
enum MaterialEventType {
  CREATE,
  MINT,
  ADDED_TO_BATCH,
}
const ClientMaterialInfo: React.FunctionComponent<IClientMaterialInfoProps> = ({
  historyItem,
}) => {
  const [css, theme] = useStyletron();
  const [historyEvents, setHistoryEvents] = useState(null);
  const [ingredients, setIngrediends] = useState(null);
  const { materialInstance, material, mintEvent } = historyItem;
  const generateIngredients = async (material) => {
    let items = {};
    for (let i = 0; i < material.recipeMaterialTokenId.length; i++) {
      const { name, amountIdentifier } = await proofchain().material.getById(
        material.recipeMaterialTokenId[i]
      );
      items[name] = pluralize(
        amountIdentifier,
        material.recipeMaterialAmount[i],
        true
      );
    }
    return <VerticalTable items={items} />;
  };
  useEffect(() => {
    const events = [];

    (async () => {
      setIngrediends(await generateIngredients(material));
      const createEvent: any = await proofchain().batch.getPastEvents(
        'MaterialCreate',
        { materialTokenId: material.materialTokenId },
        true
      );
      events.push({
        type: MaterialEventType.CREATE,
        event: createEvent[0],
      });
      events.push({
        type: MaterialEventType.MINT,
        event: mintEvent,
      });
      setHistoryEvents(
        events.sort((a, b) => b.event.block.timestamp - a.event.block.timestamp)
      );
    })();
  }, []);
  console.log(historyEvents);
  const headerConfig = {
    [MaterialEventType.ADDED_TO_BATCH]: {
      title: 'Create',
      icon: <FontAwesomeIcon icon="boxes" />,
      color: theme.colors.warning,
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
    [MaterialEventType.CREATE]: {
      title: 'Created material',
      icon: <FontAwesomeIcon icon="plus" />,
      color: theme.colors.positive,
      details: (event) => (
        <VerticalTable
          withTransactionDetails={event.event.transactionHash}
          items={{
            'Transaction Hash': (
              <TransactionLink>{event.event.transactionHash}</TransactionLink>
            ),
            Created: <TimeIndicator>{event.block.timestamp}</TimeIndicator>,
          }}
        />
      ),
    },
    [MaterialEventType.MINT]: {
      title: 'Minted new material',
      icon: <FontAwesomeIcon icon="industry" />,
      color: theme.colors.accent,
      details: (event) => (
        <VerticalTable
          withTransactionDetails={event.event.transactionHash}
          items={{
            'New material uuid': event.uuid,
            'Used materials': materialInstance.fromBatchId.length ? (
              <VerticalTable
                items={materialInstance.fromBatchId.reduce(
                  (acc, val, i) => ({
                    ...acc,
                    ['Batch id ' + val]: materialInstance.batchMaterialsUuid[
                      i
                    ].join(', '),
                  }),
                  {}
                )}
              />
            ) : (
              '-'
            ),
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
      tabs={[
        {
          title: 'Information',
          content: (
            <VerticalTable
              items={{
                'Material token ID': material.materialTokenId,
                Name: material.name,
                Code: material.code,
                'Amount Identifier': material.amountIdentifier,
                Creator: material.creator,
                Ingredients: ingredients,
                Created: (
                  <TimeIndicator>{mintEvent.block.timestamp}</TimeIndicator>
                ),
                'Create Event': (
                  <TransactionLink>
                    {mintEvent.event.transactionHash}
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
      orientation={ORIENTATION.vertical}
    />
  );
};

export default ClientMaterialInfo;
