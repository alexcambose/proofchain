import Container from '@components/layout/Container';
import { Col, Row } from '@components/layout/Grid';
import Link from '@components/link/Link';
import * as React from 'react';
import {
  FooterBottom,
  FooterContainer,
  FooterInfoSummary,
  FooterLinks,
  FooterLinksHeader,
  FooterLinksItem,
  FooterLinksItemLink,
  FooterLogo,
  FooterSocialLabel,
  FooterSocialLink,
  FooterSocialLinks,
} from './Footer.styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import config from 'config';

interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  return (
    <FooterContainer>
      <Container>
        <Col>
          <Row>
            <FooterLogo />
            <FooterInfoSummary>
              We leverage blockchain based infrastructure to create reliable and
              tamper-proof supply chain traceability.
            </FooterInfoSummary>
            <Link href="/BrandKit.zip">Brand kit</Link>
          </Row>
          <Row horizontallyCentered>
            <FooterLinks>
              <FooterLinksHeader>Proofchain</FooterLinksHeader>
              <FooterLinksItem>
                <FooterLinksItemLink href="#home">Home</FooterLinksItemLink>
              </FooterLinksItem>
              <FooterLinksItem>
                <FooterLinksItemLink href="#vision">Vision</FooterLinksItemLink>
              </FooterLinksItem>
              <FooterLinksItem>
                <FooterLinksItemLink href="#technology">
                  Technology
                </FooterLinksItemLink>
              </FooterLinksItem>
              <FooterLinksItem>
                <FooterLinksItemLink href="#documentation">
                  documentation
                </FooterLinksItemLink>
              </FooterLinksItem>
              <FooterLinksItem>
                <FooterLinksItemLink href="#team">team</FooterLinksItemLink>
              </FooterLinksItem>
              <FooterLinksItem>
                <FooterLinksItemLink href="#contact">
                  contact
                </FooterLinksItemLink>
              </FooterLinksItem>
            </FooterLinks>
          </Row>
          <Row horizontallyCentered>
            <FooterLinks>
              <FooterLinksHeader>Technology</FooterLinksHeader>
              <FooterLinksItem>
                <FooterLinksItemLink target="_blank" href={config.whitepaperLink}>Whitepaper</FooterLinksItemLink>
              </FooterLinksItem>
              <FooterLinksItem>
                <FooterLinksItemLink target="_blank" href={config.documentationLink}>Library docs</FooterLinksItemLink>
              </FooterLinksItem>
              <FooterLinksItem>
                <FooterLinksItemLink target="_blank" href={config.demoLink}>
                  demo dashboard
                </FooterLinksItemLink>
              </FooterLinksItem>
              <FooterLinksItem>
                <FooterLinksItemLink target="_blank" href={config.demoLink + '/client'}>
                  client scan app
                </FooterLinksItemLink>
              </FooterLinksItem>
              <FooterLinksItem>
                <FooterLinksItemLink
                  href="https://github.com/alexcambose/proofchain"
                  target="_blank"
                >
                  github
                </FooterLinksItemLink>
              </FooterLinksItem>
            </FooterLinks>
          </Row>
          <Row horizontallyCentered>
            <div>
              <FooterSocialLabel>CONNECT WITH US</FooterSocialLabel>
              <FooterSocialLinks>
                <FooterSocialLink href="https://github.com/alexcambose">
                  <FontAwesomeIcon icon={['fab', 'github']} />
                </FooterSocialLink>

                <FooterSocialLink href="https://twitter.com/alexcambose">
                  <FontAwesomeIcon icon={['fab', 'twitter']} />
                </FooterSocialLink>
                <FooterSocialLink href="https://facebook.com/alexcambose">
                  <FontAwesomeIcon icon={['fab', 'facebook']} />
                </FooterSocialLink>
                <FooterSocialLink href="https://linkedin.com/alexcambose">
                  <FontAwesomeIcon icon={['fab', 'linkedin']} />
                </FooterSocialLink>
                <FooterSocialLink href="https://medium.com/@alexcambose">
                  <FontAwesomeIcon icon={['fab', 'medium']} />
                </FooterSocialLink>
              </FooterSocialLinks>
            </div>
          </Row>
        </Col>
      </Container>
      <FooterBottom>Copyright © 2021 Proofchain</FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
