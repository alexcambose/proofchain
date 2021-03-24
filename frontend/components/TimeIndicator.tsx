import { StatefulTooltip } from 'baseui/tooltip';
import * as dayjs from 'dayjs';
import React from 'react';

interface TimeIndicatorProps {
  children: number;
}
const TimeIndicator: React.FC<TimeIndicatorProps> = ({ children }) => {
  return (
    <StatefulTooltip
      overrides={{
        Body: {
          style: ({ $theme }) => ({
            maxWidth: '260px',
          }),
        },
      }}
      content={dayjs.unix(children).format('h:mm:s A MMM D')}
    >
      {dayjs.unix(children).fromNow()}
    </StatefulTooltip>
  );
};
export default TimeIndicator;
