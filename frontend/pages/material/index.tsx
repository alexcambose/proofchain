import Layout from '@containers/Layout';
import Materials from '@containers/material/Materials';
import { Head } from 'next/document';
import React from 'react';

const Index = () => {
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
export default Index;
