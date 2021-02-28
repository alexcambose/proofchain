import React from 'react';
import { useStyletron } from 'baseui';
import { Grid, Cell } from 'baseui/layout-grid';
import initialState from '../store/user/initialState';
import Auth from '@containers/auth/index';
import LoginChecker from '@components/auth/LoginChecker';
const Login = () => {
  return (
    <Grid>
      <Cell skip={3} span={4}>
        <Auth></Auth>
      </Cell>
    </Grid>
  );
};
export default LoginChecker(false)(Login);
