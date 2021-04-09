import * as React from 'react';
import Container from '@components/layout/Container';
import {
  InformationContainer,
  InformationHeader,
  InformationHeaderDescription,
  InformationHeaderLogo,
  InformationHeaderStart,
  InformationHeaderSubTitle,
  InformationHeaderTitle,
} from './Information.styled';
import ProofchainLogoFullLight from '@assets/svg/proofchain-logo-full-light.svg';
import BackgroundText from '@components/backgroundText/BackgroundText';

interface IInformationProps {}

const Information: React.FunctionComponent<IInformationProps> = (props) => {
  return (
    <InformationContainer>
      <InformationHeader>
        <InformationHeaderStart>Introducing</InformationHeaderStart>
        <InformationHeaderLogo>
          <ProofchainLogoFullLight />
        </InformationHeaderLogo>
        <InformationHeaderDescription>
          Proofchain leverages blockchain technology to facilitate efficient
          communication and data exchange between global supply chains,
          providing customers with proof of product provenance and ownership.
        </InformationHeaderDescription>
      </InformationHeader>
      <BackgroundText smaller={true}>Technology</BackgroundText>

      <Container>
        <InformationHeaderSubTitle>Techology</InformationHeaderSubTitle>
        <InformationHeaderTitle>
          Blockchain and smart contracts
        </InformationHeaderTitle>
        <br />
        <br />
        aaa
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </Container>
    </InformationContainer>
  );
};

export default Information;
