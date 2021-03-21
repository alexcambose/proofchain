import Batches from '@containers/batch/Batches';
import Layout from '@containers/Layout';
import Head from 'next/head';
import { authCheck } from 'pages';
import React from 'react';

const Batch = () => {
  return (
    <>
      <Head>
        <title>All Batches</title>
      </Head>

      <Layout title="All Batches">
        <Batches />
      </Layout>
    </>
  );
};
export const getServerSideProps = authCheck(true);

export default Batch;
