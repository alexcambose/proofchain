import CodeScanImage from '@assets/images/Proofchain-code-scan.jpg';
import ProofchainImage from '@assets/images/Proofchain-product-qr.jpg';
import DemoCodeImage from '@assets/images/demo-code.png';
import CertificateManSvg from '@assets/svg/certificate-man.svg';
import BlockchainSvg from '@assets/svg/blockchain.svg';
import ProofchainLogoFullLight from '@assets/svg/proofchain-logo-full-light.svg';
import BackgroundText from '@components/backgroundText/BackgroundText';
import Container from '@components/layout/Container';
import { Col, Row } from '@components/layout/Grid';
import PersuasiveText from '@components/persuasiveText/PersuasiveText';
import * as React from 'react';
import Fade from 'react-reveal/Fade';
import { Parallax } from 'react-scroll-parallax';

import DigitalIdentityGame from './DigitalIdentityGame';
import {
  InformationCodeDemoImg,
  InformationContainer,
  InformationContent,
  InformationEaseOfUseImage1,
  InformationEaseOfUseImage1Line,
  InformationEaseOfUseImage2,
  InformationFingerprintIcon,
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
import BackgroundPanel from '@components/backgroundPanel/BackgroundPanel';

interface IInformationProps {}

const Information: React.FunctionComponent<IInformationProps> = (props) => {
  return (
    <InformationContainer>
      <BackgroundText smaller={true}>Technology</BackgroundText>
      <InformationHeader>
        <Fade top>
          <Fade>
            <InformationHeaderStart>Introducing</InformationHeaderStart>
          </Fade>
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

      <BackgroundPanel top={3000} />
      <Container>
        <InformationHeaderSubTitle id="technology">
          Techology
        </InformationHeaderSubTitle>
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
                chain entity is perfectly recorded and archived.
              </InformationContent>
            </Row>
            <Row>
              <InformationSvgContainer>
                <BlockchainSvg />
              </InformationSvgContainer>
            </Row>
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
                the framework agreed upon by all parties.This makes the
                contracts more compliant and reduces transaction execution time,
                but alsos enables actors on the supply chain to create resilient
                processes of their material products.
              </InformationContent>
            </Row>
          </Col>
        </InformationSection>

        <BackgroundPanel isRight top={1000} />

        <Parallax y={['-200px', '0px']}>
          <InformationFingerprintIcon />
        </Parallax>
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
                Proofchain uses the NFT(Non-fungible tokens) paradigm, which
                creates a digital cryptographic token that is linked to a real
                world asset, and contains metadata that distinguishes it from
                any other token. This digital identity contains a permanent
                record of an asset’s origin, characteristics and ownership.
                Tokeninzing real-world assets allows them to be bought, sold,
                and traded more efficiently while reducing the probability of
                fraud.
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

              <Parallax y={['-40px', '40px']}>
                <InformationEaseOfUseImage1
                  src={CodeScanImage}
                  alt="Ease of use image 1"
                />
              </Parallax>

              <InformationEaseOfUseImage2
                src={ProofchainImage}
                alt="Ease of use image 2"
              />
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
