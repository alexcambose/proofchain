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
    onViewDetailsClick: () => handleClick({ event: e, timestamp: e.timestamp }),
    icon: <FontAwesomeIcon icon="plus" />,
    title: 'Transport initiated',
    timestamp: e.timestamp,
    description: 'Transport entry created',
  }),
  event: (e, handleClick) => {
    const status = e.event.status;
    const selectedObject = {
      [TransportStatusEnum.READY_FOR_TRANSIT]: {
        color: '',
        icon: <FontAwesomeIcon icon="check" />,
        title: 'Ready for transit',
        timestamp: e.timestamp,
        description: 'Transport is ready to be sent to the receiver',
      },
      [TransportStatusEnum.PENDING_TRANSIT]: {
        color: '',
        icon: <FontAwesomeIcon icon="truck-loading" />,
        title: 'Pending transit',
        timestamp: e.timestamp,
        description: 'Transport is waiting to be loaded',
      },
      [TransportStatusEnum.IN_TRANSIT]: {
        color: '',
        icon: <FontAwesomeIcon icon="truck-moving" />,
        title: 'In transit',
        timestamp: e.timestamp,
        description: 'Transport is in transit',
      },
      [TransportStatusEnum.PENDING_FINALISED]: {
        color: '',
        icon: <FontAwesomeIcon icon="parachute-box" />,
        title: 'Pending finalisation',
        timestamp: e.timestamp,
        description: 'Transport is waiting receiver confirmation',
      },
      [TransportStatusEnum.FINALISED]: {
        color: '',
        icon: <FontAwesomeIcon icon="check-double" />,
        title: 'Finalised',
        timestamp: e.timestamp,
        description: 'Transport arrived at the destination',
      },
    }[status];
    return {
      ...selectedObject,
      onViewDetailsClick: () =>
        handleClick({
          event: e.event.event,
          timestamp: e.timestamp,
        }),
    };
  },
};
const TransportTimeline: React.FunctionComponent<ITransportTimelineProps> = ({
  createEvent,
  transportEvents = [],
}) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [modalEvent, setModalEvent] = useState<{
    event: any;
    timestamp: number;
  }>({ event: {}, timestamp: 0 });
  const handleClick = (e) => {
    setModalEvent(e);
    setIsModalOpened(true);
  };
  return (
    <>
      <Modal
        header="Event details"
        opened={isModalOpened}
        isWide
        onClose={() => setIsModalOpened(false)}
      >
        <VerticalTable
          withTransactionDetails={modalEvent.event.transactionHash}
          items={{
            'Event type': <code>{modalEvent.event.event}</code>,
            Created: <TimeIndicator>{modalEvent.timestamp}</TimeIndicator>,
            Transaction: (
              <TransactionLink>
                {modalEvent.event.transactionHash}
              </TransactionLink>
            ),
          }}
        />
      </Modal>
      <Timeline
        timeline={[createEvent, ...[...transportEvents].reverse()]
          .reverse()
          .map((e) => {
            if (e.event === 'TransportCreated') {
              return timelineConfig.initiated(e, handleClick);
            }
            return timelineConfig.event(e, handleClick);
          })}
      />
    </>
  );
};

export default TransportTimeline;
