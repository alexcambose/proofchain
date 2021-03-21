import Layout from '@containers/Layout';
import Transports from '@containers/transport/Transports';
import Head from 'next/head';
import { authCheck } from 'pages';
import React from 'react';

const TransportsPage = () => {
  return (
    <>
      <Head>
        <title>All Transports</title>
      </Head>

      <Layout title="All Transports">
        <Transports />{' '}
      </Layout>
    </>
  );
};
export const getServerSideProps = authCheck(true);

export default TransportsPage;
