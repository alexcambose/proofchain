import Certificates from '@containers/certificate/Certificates';
import Layout from '@containers/Layout';
import Head from 'next/head';
import { authCheck } from 'pages';
import React from 'react';

const Certificate = () => {
  return (
    <>
      <Head>
        <title>All Certificates</title>
      </Head>

      <Layout title="All Certificates">
        <Certificates />
      </Layout>
    </>
  );
};
export const getServerSideProps = authCheck(true);

export default Certificate;
