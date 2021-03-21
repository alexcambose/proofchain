import CreateBatch from '@containers/batch/CreateBatch';
import Layout from '@containers/Layout';
import Head from 'next/head';
import { authCheck } from 'pages';
import React from 'react';

const Create = () => {
  return (
    <>
      <Head>
        <title>Create Batch</title>
      </Head>

      <Layout title="Create Batch">
        <CreateBatch />
      </Layout>
    </>
  );
};
export const getServerSideProps = authCheck(true);

export default Create;
