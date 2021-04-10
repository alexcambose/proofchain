import * as React from 'react';
import Container from '@components/layout/Container';
import {
  VisionCardsContainer,
  VisionContainer,
  VisionHeader,
  VisionTopSpacer,
} from './Vision.styled';
import BackgroundText from '@components/backgroundText/BackgroundText';
import VisionCard from './VisionCard';
import CompanyIconSvg from '@assets/svg/company.svg';
import HandsIconSvg from '@assets/svg/hands.svg';
import ProductIconSvg from '@assets/svg/product.svg';
import uuid from 'react-uuid';
import PersuasiveText from '@components/persuasiveText/PersuasiveText';
import VisionGame from './VisionGame';
interface IVisionProps {}

const cards = [
  {
    icon: <CompanyIconSvg />,
    title: 'Corporate practice',
    description: 'Communicates policy and performance clearly.',
    footer: '"How is this company progressing?"',
  },
  {
    icon: <ProductIconSvg />,
    title: 'Product Proof',
    description: 'Communicates proof to consumers',
    footer: '"What’s the impact of what I’m actually buying?"',
  },
  {
    icon: <HandsIconSvg />,
    title: 'Brand purpose',
    description: 'Communicates values and beliefs to consumers.',
    footer: '"Does this brand align with my values?"',
  },
];

const Vision: React.FunctionComponent<IVisionProps> = (props) => {
  return (
    <VisionContainer>
      <Container>
        <BackgroundText>Vision</BackgroundText>
        <VisionTopSpacer />
        <VisionHeader id="vision">
          The three elements of a honest company
        </VisionHeader>
        <VisionCardsContainer>
          {cards.map((card) => (
            <VisionCard
              key={uuid()}
              title={card.title}
              icon={card.icon}
              description={card.description}
              footer={card.footer}
            />
          ))}
        </VisionCardsContainer>
        <PersuasiveText
          content={[
            { text: 'Being honest', isHighlighted: true },
            { text: ' even about problems ' },
            { text: 'increases trust.', isHighlighted: true },
          ]}
        ></PersuasiveText>
        <VisionGame />
        <PersuasiveText
          content={[
            {
              text: 'Your choices can',
              isHighlighted: true,
            },
            { text: ' drive businesses to make ' },
            {
              text: 'a positive change.',
              isHighlighted: true,
            },
          ]}
        ></PersuasiveText>
      </Container>
    </VisionContainer>
  );
};

export default Vision;
