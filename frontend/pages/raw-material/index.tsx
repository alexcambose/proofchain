import Layout from '@containers/Layout';
import RawMaterials from '@containers/material/RawMaterials';
import Head from 'next/head';
import { authCheck } from 'pages';
import React from 'react';

const Index = () => {
  return (
    <>
      <Head>
        <title>All Raw Materials</title>
      </Head>

      <Layout title="All Raw Materials">
        <RawMaterials />
      </Layout>
    </>
  );
};
export const getServerSideProps = authCheck(true);

export default Index;
