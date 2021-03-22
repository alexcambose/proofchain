import AssignCertificate from '@containers/certificate/AssignCertificate';
import Layout from '@containers/Layout';
import Head from 'next/head';
import { authCheck } from 'pages';
import React from 'react';

const Index = () => {
  return (
    <>
      <Head>
        <title>Assign certificate</title>
      </Head>

      <Layout title="Assign certificate">
        <AssignCertificate />
      </Layout>
    </>
  );
};
export const getServerSideProps = authCheck(true);

export default Index;
