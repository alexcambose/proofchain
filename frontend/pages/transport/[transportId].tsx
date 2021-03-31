import BackButton from '@components/navigation/BackButton';
import Layout from '@containers/Layout';
import TransportInfo from '@containers/transport/TransportInfo';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { authCheck } from 'pages';
import React from 'react';

const ViewTransport = () => {
  const router = useRouter();
  const { transportId } = router.query;
  return (
    <>
      <Head>
        <title>Transport</title>
      </Head>

      <Layout title="Transport information">
        <BackButton />
        <TransportInfo transportId={parseInt(transportId as string)} />
      </Layout>
    </>
  );
};
export const getServerSideProps = authCheck(true);

export default ViewTransport;
