import { styled } from 'baseui';
import { Button, KIND } from 'baseui/button';
import { StyledLink } from 'baseui/link';
import * as React from 'react';
import uuid from 'react-uuid';
import TimeIndicator from './TimeIndicator';

interface ITimelineProps {
  timeline: {
    color: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    timestamp?: number;
    onViewDetailsClick?: () => void;
  }[];
}

const TimelineContainer = styled('div', ({ $theme }) => ({}));
const TimelineElement = styled('div', ({ $theme }) => ({
  display: 'flex',
}));
const TimelineGraphics = styled('div', ({ $theme, $isReversed }) => ({
  display: 'flex',
  flexDirection: $isReversed ? 'columm' : 'column-reverse',
  alignItems: $isReversed ? 'flex-start' : 'center',
  justifyContent: 'center',
  flex: 1,
}));
const TimelineLine = styled('div', ({ $theme, $isHidden }) => ({
  height: $theme.sizing.scale1200,
  width: '2px',
  background: $theme.colors.contentTertiary,
  opacity: 0.8,

  display: $isHidden ? 'none' : 'block',
  marginBottom: $theme.sizing.scale100,
  marginTop: $theme.sizing.scale100,
}));
const TimelineDot = styled('div', ({ $theme }) => ({
  ...$theme.borders.border500,
  opacity: 0.7,
  width: $theme.sizing.scale800,
  height: $theme.sizing.scale800,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: $theme.sizing.scale600,
}));
const TimelineContent = styled('div', ({ $theme }) => ({
  marginLeft: $theme.sizing.scale400,
  flex: 10,
}));
const TimelineTitle = styled('div', ({ $theme }) => ({
  ...$theme.typography.LabelMedium,
}));
const TimelineSubtitle = styled('div', ({ $theme }) => ({
  ...$theme.typography.LabelSmall,
  color: $theme.colors.contentTertiary,
  fontStyle: 'italic',
  marginBottom: $theme.sizing.scale100,
}));

const TimelineDescription = styled('div', ({ $theme }) => ({
  ...$theme.typography.ParagraphSmall,
}));
const TimelineViewDetailsContainer = styled('div', ({ $theme }) => ({
  display: 'flex',
  ...$theme.typography.ParagraphSmall,
  flex: 1,
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
            <TimelineSubtitle>
              <TimeIndicator>{item.timestamp}</TimeIndicator>
            </TimelineSubtitle>
            <TimelineDescription>{item.description}</TimelineDescription>
          </TimelineContent>
          <TimelineViewDetailsContainer>
            <StyledLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                item.onViewDetailsClick && item.onViewDetailsClick();
              }}
            >
              Details
            </StyledLink>
          </TimelineViewDetailsContainer>
        </TimelineElement>
      ))}
    </TimelineContainer>
  );
};

export default Timeline;
