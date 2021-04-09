import CodeScanImage from '@assets/images/Proofchain-code-scan.jpg';
import ProofchainImage from '@assets/images/Proofchain-product-qr.jpg';
import DemoCodeImage from '@assets/images/demo-code.png';
import CertificateManSvg from '@assets/svg/certificate-man.svg';
import ProofchainLogoFullLight from '@assets/svg/proofchain-logo-full-light.svg';
import BackgroundText from '@components/backgroundText/BackgroundText';
import Container from '@components/layout/Container';
import { Col, Row } from '@components/layout/Grid';
import PersuasiveText from '@components/persuasiveText/PersuasiveText';
import * as React from 'react';
import Fade from 'react-reveal/Fade';
import DigitalIdentityGame from './DigitalIdentityGame';
import {
  InformationCodeDemoImg,
  InformationContainer,
  InformationContent,
  InformationEaseOfUseImage1,
  InformationEaseOfUseImage1Line,
  InformationEaseOfUseImage2,
  InformationHeader,
  InformationHeaderDescription,
  InformationHeaderLogo,
  InformationHeaderStart,
  InformationHeaderSubTitle,
  InformationHeaderTitle,
  InformationQuote,
  InformationSection,
  InformationSvgContainer,
  InformationTree,
} from './Information.styled';

interface IInformationProps {}

const Information: React.FunctionComponent<IInformationProps> = (props) => {
  return (
    <InformationContainer>
      <InformationHeader>
        <Fade top>
          <InformationHeaderStart>Introducing</InformationHeaderStart>
          <InformationHeaderLogo>
            <ProofchainLogoFullLight />
          </InformationHeaderLogo>
        </Fade>
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
        <InformationSection>
          <InformationHeaderTitle>Corporate Practice</InformationHeaderTitle>
          <Col>
            <Row centered>
              <InformationContent>
                Supply chain entities and products can be audited by third party
                "certificate authority" organizations. They can see what you are
                doing and emit certificates with an impact messages to build
                trust in your brand. Each certificate authority is incentivized
                to revoke a certificate as soon as the brand starts doing things
                that are no longer consistent with it.
              </InformationContent>
            </Row>
            <Row>
              <InformationTree />
            </Row>
            <Row>
              <PersuasiveText
                small
                content={[
                  { text: '70%', isHighlighted: true },
                  {
                    text:
                      ' of customers are saying "I am most interested in hearing about the sustainability impacts of the products I buy"*',
                  },
                ]}
              />{' '}
              <PersuasiveText
                small
                content={[
                  { text: '98%', isHighlighted: true },
                  {
                    text:
                      ' of customers are saying "I am most interested in hearing about the sustainability impacts of the products I buy"*',
                  },
                ]}
              />
              <InformationQuote>
                *Source: CGF/Futerra consumer research, October 2018.
                Respondents: 3,621 consumers in 7 countries.
              </InformationQuote>
              <InformationQuote>
                **Source: Futerra consumer research, June 2019. Respondents:
                2,400 consumers in UK, US, South Africa and India.
              </InformationQuote>
            </Row>
          </Col>
        </InformationSection>
        <InformationSection height={830}>
          <Col>
            <Row>
              <InformationEaseOfUseImage1Line />
              <Fade top>
                <InformationEaseOfUseImage1
                  src={CodeScanImage}
                  alt="Ease of use image 1"
                />
                <InformationEaseOfUseImage2
                  src={ProofchainImage}
                  alt="Ease of use image 2"
                />
              </Fade>
            </Row>

            <Row centered>
              <InformationHeaderTitle>Ease of use</InformationHeaderTitle>
              <Col>
                <InformationContent>
                  Each material has a unique token identifier that needs to be
                  added on the physical product, and can be searched by anyone
                  to check for its authenticity, provenance and ownership from
                  origin to point of sale (POS).
                </InformationContent>
              </Col>
            </Row>
          </Col>
        </InformationSection>
        <InformationSection>
          <InformationHeaderTitle>
            Integration with existing systems
          </InformationHeaderTitle>
          <Col>
            <Row centered>
              <InformationContent>
                Proofchain provides a web3 based library that interacts with the
                smart contract system without the hassle of spending money on
                expensive smart contracts engineers to integrate it into your
                existing ERP software. Supercharge your global supply chain with
                Blockchain technology!
              </InformationContent>
            </Row>
            <Row>
              <InformationCodeDemoImg
                src={DemoCodeImage}
                alt="Code demo image"
              />
            </Row>
          </Col>
        </InformationSection>
      </Container>
    </InformationContainer>
  );
};

export default Information;
