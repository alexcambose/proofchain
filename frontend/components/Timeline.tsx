import { styled } from 'baseui';
import * as React from 'react';
import uuid from 'react-uuid';

interface ITimelineProps {
  timeline: {
    color: string;
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
}

const TimelineContainer = styled('div', ({ $theme }) => ({}));
const TimelineElement = styled('div', ({ $theme }) => ({
  display: 'flex',
  // padding: $theme.sizing.scale600,
}));
const TimelineGraphics = styled('div', ({ $theme, $isReversed }) => ({
  display: 'flex',
  flexDirection: $isReversed ? 'columm' : 'column-reverse',
  alignItems: $isReversed ? 'flex-start' : 'center',
}));
const TimelineLine = styled('div', ({ $theme, $isHidden }) => ({
  height: $theme.sizing.scale900,
  width: '2px',
  background: $theme.colors.contentTertiary,
  display: $isHidden ? 'none' : 'block',
  marginBottom: $theme.sizing.scale100,
  marginTop: $theme.sizing.scale100,
}));
const TimelineDot = styled('div', ({ $theme }) => ({
  borderRadius: '50%',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: $theme.colors.contentTertiary,
  width: $theme.sizing.scale800,
  height: $theme.sizing.scale800,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
const TimelineContent = styled('div', ({ $theme }) => ({
  marginLeft: $theme.sizing.scale300,
}));
const TimelineTitle = styled('div', ({ $theme }) => ({
  ...$theme.typography.LabelMedium,
}));
const TimelineDescription = styled('div', ({ $theme }) => ({
  ...$theme.typography.ParagraphSmall,
}));

const Timeline: React.FunctionComponent<ITimelineProps> = ({ timeline }) => {
  return (
    <TimelineContainer>
      {timeline.map((item, i) => (
        <TimelineElement key={uuid()}>
          <TimelineGraphics $isReversed={i === timeline.length - 1}>
            {i !== timeline.length - 1 && <TimelineLine />}
            <TimelineDot>{item.icon}</TimelineDot>
          </TimelineGraphics>
          <TimelineContent>
            <TimelineTitle>{item.title}</TimelineTitle>
            <TimelineDescription>{item.description}</TimelineDescription>
          </TimelineContent>
        </TimelineElement>
      ))}
    </TimelineContainer>
  );
};

export default Timeline;
