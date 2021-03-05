import React from 'react';
import { useStyletron } from 'baseui';
import { Grid, Cell } from 'baseui/layout-grid';
import initialState from '../store/user/initialState';
import Auth from '@containers/auth/index';
import LoginChecker from '@components/auth/LoginChecker';
import Cookies from 'cookies';
import { authCheck } from 'pages';
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
