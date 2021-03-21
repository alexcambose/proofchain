import Layout from '@containers/Layout';
import CreateRawMaterial from '@containers/material/CreateRawMaterial';
import Head from 'next/head';
import { authCheck } from 'pages';
import React from 'react';

const Index = () => {
  return (
    <>
      <Head>
        <title>Create new raw material</title>
      </Head>

      <Layout title="Create new Raw Material">
        <CreateRawMaterial />
      </Layout>
    </>
  );
};
export const getServerSideProps = authCheck(true);

export default Index;
