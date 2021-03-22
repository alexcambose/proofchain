import Layout from '@containers/Layout';
import CreateCertificate from '@containers/certificate/CreateCertificate';
import Head from 'next/head';
import { authCheck } from 'pages';
import React from 'react';

const Index = () => {
  return (
    <>
      <Head>
        <title>Create Certificate</title>
      </Head>

      <Layout title="Create Certificate">
        <CreateCertificate />
      </Layout>
    </>
  );
};
export const getServerSideProps = authCheck(true);

export default Index;
