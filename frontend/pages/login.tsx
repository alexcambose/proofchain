import Footer from '@components/navigation/Footer';
import Auth from '@containers/auth/index';
import { Cell, Grid } from 'baseui/layout-grid';
import Head from 'next/head';
import { authCheck } from 'pages';
import React from 'react';
const Login = () => {
  return (
    <>
      <div>
        <Head>
          <title>Authentication</title>
        </Head>

        <Grid>
          <Cell skip={4} span={4}>
            <Auth />
          </Cell>
        </Grid>
      </div>
      <Footer />
    </>
  );
};
export const getServerSideProps = authCheck(false);
export default Login;
