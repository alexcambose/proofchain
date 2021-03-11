import GuestNav from '@components/navigation/navbar/GuestNav';
import CompanySidebar from '@components/navigation/sidebar/CompanySidebar';
import { BEHAVIOR, Cell, Grid } from 'baseui/layout-grid';
import React from 'react';
import { useSelector } from 'react-redux';
import { State } from 'store';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
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
      <GuestNav />
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
        <Cell span={10}>{children}</Cell>
      </Grid>
    </>
  );
};

export default Layout;
