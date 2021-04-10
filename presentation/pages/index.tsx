import React from 'react';
import MainIndex from '@containers/Main/Index';
import Head from 'next/head';

const Index: React.FC = () => {
  return (
    <>
      <Head>
        <title>Proofchain</title>
      </Head>
      <MainIndex />
    </>
  );
};
export default Index;
