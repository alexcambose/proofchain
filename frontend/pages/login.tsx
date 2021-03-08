import Auth from '@containers/auth/index';
import { Cell, Grid } from 'baseui/layout-grid';
import { authCheck } from 'pages';
import React from 'react';
const Login = () => {
  return (
    <Grid>
      <Cell skip={4} span={4}>
        <Auth />
      </Cell>
    </Grid>
  );
};
export const getServerSideProps = authCheck(false);
export default Login;
