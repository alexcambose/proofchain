import styled, { css } from 'styled-components';
import ProofchainLogo from '@assets/svg/proofchain-logo-full-light.svg';

export const FooterContainer = styled.section`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.sizing.scale2400} 0
    ${({ theme }) => theme.sizing.scale800} 0;
`;
export const FooterLogo = styled(ProofchainLogo)`
  width: 100%;
  height: 30px;
  margin-bottom: ${({ theme }) => theme.sizing.scale500};
`;
export const ContactTitle = styled.section``;
export const ContactSubtitle = styled.section``;
export const FooterInfoSummary = styled.p``;
export const FooterBottom = styled.div`
  padding: ${({ theme }) => theme.sizing.scale1600} 0
    ${({ theme }) => theme.sizing.scale400};
  text-align: center;
`;
export const FooterLinksHeader = styled.li`
  font-weight: 800;
  padding-bottom: ${({ theme }) => theme.sizing.scale600};

  font-size: 1.3rem;
`;
export const FooterLinksItem = styled.li``;
export const FooterLinksItemLink = styled.a`
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.sizing.scale300} 0;
  &:hover {
    color: ${({ theme }) => theme.colors.gray['100']};
  }
`;
export const FooterLinks = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;
export const FooterSocialLabel = styled.div`
  font-size: 0.9rem;
  margin-bottom: ${({ theme }) => theme.sizing.scale600};
`;
export const FooterSocialLinks = styled.div``;
export const FooterSocialLink = styled.a`
  text-decoration: none;
  display: inline-block;
  &:not(:first-of-type) {
    margin-left: ${({ theme }) => theme.sizing.scale400};
  }
  font-size: 1.7rem;
  color: ${({ theme }) => theme.colors.white};
  &:hover {
    color: ${({ theme }) => theme.colors.gray['100']};
  }
`;
