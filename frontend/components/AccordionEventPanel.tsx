import { styled, useStyletron } from 'baseui';
import { Panel } from 'baseui/accordion';
import * as React from 'react';
import TimeIndicator from './TimeIndicator';

interface IAccordionEventPanelProps {
  iconColor: string;
  icon: React.ReactNode;
  title: string;
  timestamp: number;
  children: React.ReactNode;
}

const TimeContainer = styled('div', ({ $theme }) => ({
  ...$theme.typography.ParagraphXSmall,
}));

const AccordionEventPanel: React.FunctionComponent<IAccordionEventPanelProps> = ({
  iconColor,
  title,
  timestamp,
  icon,
  children,
  ...props
}) => {
  const [css, theme] = useStyletron();

  return (
    <Panel
      {...props}
      title={
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          <span
            className={css({
              color: iconColor,
              marginRight: theme.sizing.scale200,
            })}
          >
            {icon}
          </span>{' '}
          {title}
          {/* -{' '}
          <TimeContainer>
            <TimeIndicator>{timestamp}</TimeIndicator>
          </TimeContainer> */}
        </div>
      }
    >
      {children}
    </Panel>
  );
};

export default AccordionEventPanel;
