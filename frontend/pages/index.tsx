import CreateEntityForm from '@containers/auth/components/entity/CreateEntityForm';
import InitialSetupSteps from '@containers/auth/components/entity/InitialSetupSteps';
import Layout from '@containers/Layout';
import { logout, setLoggedIn } from '@store/user';
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

const Index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const hasEntity = useSelector((state: State) => state.user.hasEntity);
  if (!hasEntity) {
    return (
      <>
        <Head>
          <title>Get started</title>
        </Head>

        <Layout>
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
      <Layout>aa</Layout>
    </>
  );
};
export const authCheck = (expectLoggedIn) =>
  wrapper.getServerSideProps(async ({ store, req, res, ...other }) => {
    const cookies = new Cookies(req, res);
    const loggedIn = new AuthManager(cookies).isLoggedIn();

    if (loggedIn) {
      store.dispatch(setLoggedIn(true));
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

export default Index;
