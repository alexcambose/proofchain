import ClientScan from '@containers/client/ClientScan';
import ClientLayout from '@containers/ClientLayout';
import Head from 'next/head';
import React from 'react';

const ClientIndexPage = () => {
  return (
    <>
      <Head>
        <title>Proofchain</title>
      </Head>
      <ClientLayout>
        <ClientScan />
      </ClientLayout>
    </>
  );
};

export default ClientIndexPage;
