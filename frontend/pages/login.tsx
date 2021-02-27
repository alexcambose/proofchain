import React from 'react';
import { useStyletron } from 'baseui';
import { Grid, Cell } from 'baseui/layout-grid';
import initialState from '../store/user/initialState';
import Auth from '@containers/auth/index';
const Login = () => {
  return (
    <Grid>
      <Cell skip={3} span={4}>
        <Auth></Auth>
      </Cell>
    </Grid>
  );
};
export default Login;
