import Layout from '@containers/Layout';
import CreateMaterial from '@containers/material/CreateMaterial';
import { Head } from 'next/document';
import React from 'react';

const Index = () => {
  return (
    <>
      <Head>
        <title>Create new materials</title>
      </Head>

      <Layout title="Create Material">
        <CreateMaterial />
      </Layout>
    </>
  );
};
export default Index;
