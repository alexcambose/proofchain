import Timeline from '@components/Timeline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

interface ITransportTimelineProps {
  createEvent: any;
  transportEvents?: any[];
}

const TransportTimeline: React.FunctionComponent<ITransportTimelineProps> = ({
  createEvent,
  transportEvents = [],
}) => {
  console.log(createEvent, transportEvents);
  return (
    <Timeline
      timeline={[createEvent, ...transportEvents].map((e) => {
        if (e.event === 'TransportInitiated') {
          return {
            color: '',
            icon: <FontAwesomeIcon icon="plus" />,
            title: 'Transport initiated',
            timestamp: e.timestamp,
            description: 'Lorem ipsum dolor sit amet',
          };
        }
        return {
          color: '',
          icon: <FontAwesomeIcon icon="plus" />,
          title: '',
          description: '',
        };
      })}
    />
  );
};

export default TransportTimeline;
