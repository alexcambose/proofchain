import Layout from '@containers/Layout';
import CreateTransport from '@containers/transport/CreateTransport';
import Head from 'next/head';
import { authCheck } from 'pages';
import React from 'react';

const CreateTransportPage = () => {
  return (
    <>
      <Head>
        <title>Create Transport</title>
      </Head>

      <Layout title="Create Transport">
        <CreateTransport />{' '}
      </Layout>
    </>
  );
};
export const getServerSideProps = authCheck(true);

export default CreateTransportPage;
