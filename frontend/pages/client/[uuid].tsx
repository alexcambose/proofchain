import ClientProductInfo from '@containers/client/ClientProductInfo';
import ClientScan from '@containers/client/ClientScan';
import ClientLayout from '@containers/ClientLayout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const ClientInfoPage = () => {
  const router = useRouter();
  const { uuid } = router.query;
  return (
    <>
      <Head>
        <title>Proofchain</title>
      </Head>
      <ClientLayout>
        {uuid && <ClientProductInfo uuid={parseInt(uuid as string)} />}
      </ClientLayout>
    </>
  );
};

export default ClientInfoPage;
