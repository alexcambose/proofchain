import Layout from '@containers/Layout';
import Materials from '@containers/material/Materials';
import Head from 'next/head';
import React from 'react';

const Material = () => {
  return (
    <>
      <Head>
        <title>Materials</title>
      </Head>

      <Layout title="All Materials">
        <Materials />
      </Layout>
    </>
  );
};
export default Material;
