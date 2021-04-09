import * as React from 'react';
import {
  DigitalIdentityCode,
  DigitalIdentityContainer,
  DigitalIdentityProduct,
  DigitalItentityHandler,
} from './DigitalIdentityGame.styled';
import dynamic from 'next/dynamic';

const BeforeAfterReact = dynamic(() => import('before-after-react'), {
  ssr: false,
});

interface IDigitalIdentityGameProps {}

const DigitalIdentityGame: React.FunctionComponent<IDigitalIdentityGameProps> = (
  props
) => {
  return (
    <DigitalIdentityContainer>
      <BeforeAfterReact
        secondImgSrc="/abstract-product.svg"
        firstImgSrc="/carbon.png"
        seperatorImg="/left-and-right-caret.svg"
        cursor="pointer"
        containerClass="before-after-container"
        // seperatorImg={}
      />
    </DigitalIdentityContainer>
  );
};

export default DigitalIdentityGame;
