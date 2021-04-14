import Grid2 from '@components/layout/Grid2';
import { styled } from 'baseui';
import { BEHAVIOR, Cell, Grid } from 'baseui/layout-grid';
import { StyledLink } from 'baseui/link';
import { Paragraph1 } from 'baseui/typography';
import * as React from 'react';

interface IFooterProps {}

const FooterContainer = styled('footer', ({ $theme }) => ({
  borderTopWidth: '1px',
  borderTopStyle: 'solid',
  borderTopColor: $theme.colors.borderOpaque,
  backgroundColor: $theme.colors.backgroundSecondary,
  // paddingTop: $theme.sizing.scale600,
  paddingBottom: $theme.sizing.scale100,
}));
const FooterList = styled('ul', ({ $theme, $reversed }) => ({
  listStyleType: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: $reversed ? 'flex-start' : 'flex-end',
  height: '100%',
  [$theme.mediaQuery.small]: {
    justifyContent: 'center',
  },
}));
const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  return (
    <FooterContainer>
      <Grid>
        <Cell span={[4, 4, 6]}>
          <FooterList $reversed>
            <li>
              <Paragraph1 $style={{ textAlign: 'center' }}>
                Copyright © 2021 <strong>Proofchain</strong>. All rights
                reserved.
              </Paragraph1>
            </li>
          </FooterList>
        </Cell>
        <Cell span={[4, 4, 6]}>
          <FooterList>
            <li>
              <StyledLink
                href="https://github.com/alexcambose/proofchain"
                target="_blank"
              >
                Github
              </StyledLink>
            </li>
          </FooterList>
        </Cell>
      </Grid>
    </FooterContainer>
  );
};

export default Footer;
