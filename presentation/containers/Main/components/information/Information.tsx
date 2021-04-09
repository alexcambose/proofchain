import * as React from 'react';
import Container from '@components/layout/Container';
import {
  InformationContainer,
  InformationContent,
  InformationHeader,
  InformationHeaderDescription,
  InformationHeaderLogo,
  InformationHeaderStart,
  InformationHeaderSubTitle,
  InformationHeaderTitle,
  InformationSection,
  InformationSvgContainer,
} from './Information.styled';
import ProofchainLogoFullLight from '@assets/svg/proofchain-logo-full-light.svg';
import BackgroundText from '@components/backgroundText/BackgroundText';
import { Col, Row } from '@components/layout/Grid';
import CertificateManSvg from '@assets/svg/certificate-man.svg';
import TreeSvg from '@assets/svg/tree.svg';
import DigitalIdentityGame from './DigitalIdentityGame';

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
        <InformationSection>
          <InformationHeaderTitle>
            Blockchain and smart contracts
          </InformationHeaderTitle>

          <Col>
            <Row centered>
              <InformationContent>
                <strong>Blockchain</strong> is a decentralized, distributed
                database that maintains a continuously growing list of secure
                and tamper proof data records.
              </InformationContent>
              <InformationContent>
                Each individual operation or interaction, such as creating a new
                material, adding it to a batch or sending it to another supply
                chain entity is perfectly recorded and archived
              </InformationContent>
            </Row>
            <Row>image</Row>
          </Col>
          <Col>
            <Row>
              <InformationSvgContainer>
                <CertificateManSvg />
              </InformationSvgContainer>
            </Row>
            <Row centered>
              <InformationContent>
                <strong>Smart Contracts</strong> contains predictable and
                verifiable code that executes supply chain transactions within
                the framework agreed upon by all parties which makes the
                contracts more compliant and reduces transaction execution time.
                This enables actors on the supply chain to create resilient
                processes of their material products.
              </InformationContent>
            </Row>
          </Col>
        </InformationSection>
        <InformationSection>
          <InformationHeaderTitle>Digital Identity</InformationHeaderTitle>
          <Col>
            <Row centered>
              <InformationContent>
                <strong>Proofchain</strong> infrastructure creates a unique
                digital identity for the asset and makes it available to all
                stakeholders. The resulting lift in transparency, confidence and
                trust lays the foundation for whole industries to advance.
              </InformationContent>
              <InformationContent>
                This digital identity contains a permanent digital record of an
                asset’s origin, characteristics and ownership.
              </InformationContent>
            </Row>
            <Row>
              <DigitalIdentityGame />
            </Row>
          </Col>
        </InformationSection>
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
