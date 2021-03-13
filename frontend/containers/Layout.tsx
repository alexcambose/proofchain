import EntityNav from '@components/navigation/navbar/EntityNav';
import GuestNav from '@components/navigation/navbar/GuestNav';
import CompanySidebar from '@components/navigation/sidebar/CompanySidebar';
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

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}
const BreadcrumbNavigation = () => {
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

      setBreadcrumbs([{ text: 'home', href: '/' }, ...pathArray]);
    }
  }, [router]);

  if (!breadcrumbs) {
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
              <StyledLink href={breadcrumb.href}>{breadcrumb.text}</StyledLink>
            )}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const hasEntity = useSelector((state: State) => state.user.hasEntity);
  if (!hasEntity) {
    return (
      <>
        <GuestNav />
        {children}
      </>
    );
  }
  return (
    <>
      <EntityNav />
      <Grid
        behavior={BEHAVIOR.fluid}
        overrides={{
          Grid: {
            style: ({ $theme }) => ({
              paddingRight: '0 !important',
              paddingLeft: '0 !important',
            }),
          },
        }}
      >
        <Cell
          span={2}
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
        <Cell span={10}>
          <BreadcrumbNavigation />
          <Block marginTop="scale400">
            {title && <Display4>{title}</Display4>}
            {children}
          </Block>
        </Cell>
      </Grid>
    </>
  );
};

export default Layout;
