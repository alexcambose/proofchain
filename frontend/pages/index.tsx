import CreateEntityForm from '@containers/auth/components/entity/CreateEntityForm';
import InitialSetupSteps from '@containers/auth/components/entity/InitialSetupSteps';
import Index from '@containers/index/Index';
import Layout from '@containers/Layout';
import { logout, setInitialData, setLoggedIn } from '@store/user';
import { refreshLogin, refreshUserInfo } from '@store/user/actions';
import { AuthManager } from '@utils/auth/authManager';
import { Cell, Grid } from 'baseui/layout-grid';
import Cookies from 'cookies';
import Head from 'next/head';
import { useRouter } from 'next/router';
import proofchain, { initProofchain } from 'proofchain';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import web3Instance from 'web3Instance';
import { State, wrapper } from '../store';

const IndexPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const hasEntity = useSelector((state: State) => state.user.hasEntity);
  if (!hasEntity) {
    return (
      <>
        <Head>
          <title>Get started</title>
        </Head>

        <Layout noContainer>
          <Grid>
            <Cell skip={[0, 1, 3]} span={[4, 6, 6]}>
              <InitialSetupSteps />
            </Cell>
          </Grid>
        </Layout>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Layout noContainer>
        <Index />
      </Layout>
    </>
  );
};
export const authCheck = (expectLoggedIn) =>
  wrapper.getServerSideProps(async ({ store, req, res, ...other }) => {
    const cookies = new Cookies(req, res);
    const authManager = new AuthManager(cookies);
    let loggedIn = authManager.isLoggedIn();
    if (loggedIn && authManager.getInfo().type !== 'metamask') {
      store.dispatch(setLoggedIn(true));
      store.dispatch(setInitialData(await refreshUserInfo(authManager)));
      // after refresh user info, chech if hasEntity is set to true,
      // if (!store.getState().user.hasEntity) {
      //   authManager.clearInfo();
      //   store.dispatch(logout());
      // }
    }

    const onLoginPage = req.url == '/login';
    if (expectLoggedIn && !loggedIn && !onLoginPage) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    } else if (!expectLoggedIn && loggedIn && onLoginPage) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    } else {
      return { props: {} };
    }
  });
export const getServerSideProps = authCheck(true);

export default IndexPage;
