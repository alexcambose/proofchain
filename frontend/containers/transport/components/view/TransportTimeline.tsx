import Timeline from '@components/Timeline';
import { TransportStatusEnum } from '@enums';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

interface ITransportTimelineProps {
  createEvent: any;
  transportEvents?: any[];
}

const timelineConfig = {
  initiated: (e) => ({
    color: '',
    icon: <FontAwesomeIcon icon="plus" />,
    title: 'Transport initiated',
    timestamp: e.timestamp,
    description: 'Transport entry created',
  }),
  event: (e) => {
    const status = e.event.status;
    console.log(status);
    return {
      [TransportStatusEnum.READY_FOR_TRANSIT]: {
        color: '',
        icon: <FontAwesomeIcon icon="check" />,
        title: 'Ready for transit',
        timestamp: e.timestamp,
        description: 'Transport is ready to be sent to the receiver',
      },
      [TransportStatusEnum.PENDING_TRANSIT]: {
        color: '',
        icon: <FontAwesomeIcon icon="check" />,
        title: 'Pending transit',
        timestamp: e.timestamp,
        description: 'Transport is waiting to be loaded',
      },
      [TransportStatusEnum.IN_TRANSIT]: {
        color: '',
        icon: <FontAwesomeIcon icon="check" />,
        title: 'In transit',
        timestamp: e.timestamp,
        description: 'Transport is in transit',
      },
      [TransportStatusEnum.FINALISED]: {
        color: '',
        icon: <FontAwesomeIcon icon="check" />,
        title: 'Finalised',
        timestamp: e.timestamp,
        description: 'Transport arrived at the destination',
      },
    }[status];
  },
};
const TransportTimeline: React.FunctionComponent<ITransportTimelineProps> = ({
  createEvent,
  transportEvents = [],
}) => {
  console.log(createEvent, transportEvents);
  return (
    <Timeline
      timeline={[createEvent, ...transportEvents].map((e) => {
        if (e.event === 'TransportInitiated') {
          return timelineConfig.initiated(e);
        }
        return timelineConfig.event(e);
      })}
    />
  );
};

export default TransportTimeline;
