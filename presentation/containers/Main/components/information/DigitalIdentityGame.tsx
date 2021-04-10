import * as React from 'react';
import { DigitalIdentityContainer } from './DigitalIdentityGame.styled';
import dynamic from 'next/dynamic';

const BeforeAfterReact = dynamic(
  () => import('@components/beforeAfter/BeforeAfterReact'),
  {
    ssr: false,
  }
);

interface IDigitalIdentityGameProps {}

const DigitalIdentityGame: React.FunctionComponent<IDigitalIdentityGameProps> = (
  props
) => {
  return (
    <DigitalIdentityContainer>
      <BeforeAfterReact
        // @ts-ignore
        secondImgSrc="/abstract-product.svg"
        firstImgSrc="/transaction-code.png"
        seperatorImg="/left-and-right-caret.svg"
        cursor="pointer"
        containerClass="before-after-container"
        // seperatorImg={}
      />
    </DigitalIdentityContainer>
  );
};

export default DigitalIdentityGame;
