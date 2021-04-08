import * as React from 'react';
import styled, { css } from 'styled-components';

interface IVisionCardProps {
  title: React.ReactNode;
  icon: React.ReactNode;
  description: React.ReactNode;
  footer: React.ReactNode;
}

const VisionCardContainer = styled.div`
  flex: 1;
  text-align: center;
`;
const VisionCardHeader = styled.h3`
  text-align: center;

  font-size: ${({ theme }) => theme.font.large};
`;
const VisionCardIcon = styled.span`
  & > svg {
    width: 3rem;
    height: auto;
  }
`;
const VisionCardDescription = styled.div`
  text-align: center;
  height: 60px;
  font-size: ${({ theme }) => theme.font.medium};

  margin-bottom: ${({ theme }) => theme.sizing.scale800};
`;
const VisionCardFooter = styled.div`
  text-align: center;
  font-style: italic;
  opacity: 0.9;
`;

const VisionCard: React.FunctionComponent<IVisionCardProps> = ({
  title,
  icon,
  description,
  footer,
}) => {
  return (
    <VisionCardContainer>
      <VisionCardIcon>{icon}</VisionCardIcon>
      <VisionCardHeader>{title}</VisionCardHeader>
      <VisionCardDescription>{description}</VisionCardDescription>
      <VisionCardFooter>{footer}</VisionCardFooter>
    </VisionCardContainer>
  );
};

export default VisionCard;
