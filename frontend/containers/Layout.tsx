import EntityNav from '@components/navigation/navbar/EntityNav';
import GuestNav from '@components/navigation/navbar/GuestNav';
import CompanySidebar from '@components/navigation/Sidebar';
import { BEHAVIOR, Cell, Grid } from 'baseui/layout-grid';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { State } from 'store';
import { Breadcrumbs } from 'baseui/breadcrumbs';
import { StyledLink } from 'baseui/link';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Block } from 'baseui/block';
import { Display4 } from 'baseui/typography';
import uuid from 'react-uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from '@components/navigation/Footer';
import { styled, useStyletron } from 'baseui';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  noContainer?: boolean;
}
const BreadcrumbNavigation = () => {
  const [theme, css] = useStyletron();
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState(null);

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/');
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return {
          text: path,
          href: '/' + linkPath.slice(0, i + 1).join('/'),
        };
      });

      setBreadcrumbs([
        { text: <FontAwesomeIcon icon="home" />, href: '/' },
        ...pathArray,
      ]);
    }
  }, [router]);

  if (router.pathname === '/' || !breadcrumbs) {
    return null;
  }
  return (
    <Breadcrumbs
      overrides={{
        List: {
          style: ({ $theme }) => ({
            padding: $theme.sizing.scale500,
            background: $theme.colors.backgroundSecondary,
          }),
        },
      }}
    >
      {breadcrumbs.map((breadcrumb, i) => {
        return (
          <Link key={uuid()} href={breadcrumb.href}>
            {i === breadcrumbs.length - 1 ? (
              <span>{breadcrumb.text}</span>
            ) : (
              <StyledLink animateUnderline href={breadcrumb.href}>
                {breadcrumb.text}
              </StyledLink>
            )}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
const ChildrenContainer = styled('div', ({ $theme }) => ({
  boxShadow: $theme.lighting.shadow600,
  padding: $theme.sizing.scale1000,
}));
const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  noContainer = false,
}) => {
  const hasEntity = useSelector((state: State) => state.user.hasEntity);
  if (!noContainer) {
    children = (
      <ChildrenContainer>
        {title && <Display4>{title}</Display4>}
        <Block paddingTop="scale400">{children}</Block>
      </ChildrenContainer>
    );
  }
  if (!hasEntity) {
    return (
      <>
        <GuestNav />
        <div>{children}</div>
      </>
    );
  }
  return (
    <div style={{ height: '100%', backgroundColor: 'rgb(251,251,251)' }}>
      <EntityNav />
      <Grid
        behavior={BEHAVIOR.fluid}
        overrides={{
          Grid: {
            style: ({ $theme }) => ({
              paddingRight: '0 !important',
              paddingLeft: '0 !important',
              paddingTop: '20px',
              // height: '100%',
            }),
          },
        }}
      >
        <Cell
          span={[4, 8, 2]}
          overrides={{
            Cell: {
              style: ({ $theme }) => ({
                paddingLeft: '0 !important',
              }),
            },
          }}
        >
          <CompanySidebar />
        </Cell>
        <Cell span={[4, 8, 10]}>
          <BreadcrumbNavigation />
          <Block paddingTop="scale400" $style={{}}>
            {children}
          </Block>
        </Cell>
      </Grid>
    </div>
  );
};

export default Layout;
