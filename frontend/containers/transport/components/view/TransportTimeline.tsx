import Modal from '@components/Modal';
import VerticalTable from '@components/table/VerticalTable';
import TimeIndicator from '@components/TimeIndicator';
import Timeline from '@components/Timeline';
import TransactionLink from '@components/TransactionLink';
import { TransportStatusEnum } from '@enums';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { useState } from 'react';

interface ITransportTimelineProps {
  createEvent: any;
  transportEvents?: any[];
}

const timelineConfig = {
  initiated: (e, handleClick) => ({
    color: '',
    onViewDetailsClick: () => handleClick(e),
    icon: <FontAwesomeIcon icon="plus" />,
    title: 'Transport initiated',
    timestamp: e.timestamp,
    description: 'Transport entry created',
  }),
  event: (e, handleClick) => {
    const status = e.event.status;
    console.log(status);
    return {
      [TransportStatusEnum.READY_FOR_TRANSIT]: {
        color: '',
        icon: <FontAwesomeIcon icon="check" />,
        onViewDetailsClick: () => handleClick(e),
        title: 'Ready for transit',
        timestamp: e.timestamp,
        description: 'Transport is ready to be sent to the receiver',
      },
      [TransportStatusEnum.PENDING_TRANSIT]: {
        color: '',
        icon: <FontAwesomeIcon icon="check" />,
        title: 'Pending transit',
        onViewDetailsClick: () => handleClick(e),
        timestamp: e.timestamp,
        description: 'Transport is waiting to be loaded',
      },
      [TransportStatusEnum.IN_TRANSIT]: {
        color: '',
        icon: <FontAwesomeIcon icon="check" />,
        title: 'In transit',
        timestamp: e.timestamp,
        onViewDetailsClick: () => handleClick(e),
        description: 'Transport is in transit',
      },
      [TransportStatusEnum.FINALISED]: {
        color: '',
        icon: <FontAwesomeIcon icon="check" />,
        title: 'Finalised',
        timestamp: e.timestamp,
        description: 'Transport arrived at the destination',
        onViewDetailsClick: () => handleClick(e),
      },
    }[status];
  },
};
const TransportTimeline: React.FunctionComponent<ITransportTimelineProps> = ({
  createEvent,
  transportEvents = [],
}) => {
  console.log(createEvent, transportEvents);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [modalEvent, setModalEvent] = useState<any>({});
  const handleClick = (e) => {
    setModalEvent(e);
    console.log(e);
    setIsModalOpened(true);
  };
  return (
    <>
      <Modal
        overrides={{
          Dialog: {},
        }}
        header="Event details"
        opened={isModalOpened}
        onClose={() => setIsModalOpened(false)}
      >
        <VerticalTable
          withTransactionDetails={modalEvent.transactionHash}
          items={{
            'Event type': <code>{modalEvent.event}</code>,
            Created: <TimeIndicator>{modalEvent.timestamp}</TimeIndicator>,
            Transaction: (
              <TransactionLink>{modalEvent.transactionHash}</TransactionLink>
            ),
          }}
        />
      </Modal>
      <Timeline
        timeline={[createEvent, ...transportEvents].map((e) => {
          if (e.event === 'TransportInitiated') {
            return timelineConfig.initiated(e, handleClick);
          }
          return timelineConfig.event(e, handleClick);
        })}
      />
    </>
  );
};

export default TransportTimeline;
