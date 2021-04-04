import BatchInfo from '@containers/batch/BatchInfo';
import Layout from '@containers/Layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { authCheck } from 'pages';
import React from 'react';

const ViewBatch = () => {
  const router = useRouter();
  const { batchid: batchId } = router.query;
  return (
    <>
      <Head>
        <title>Certificate</title>
      </Head>

      <Layout>
        <BatchInfo batchId={parseInt(batchId as string)} />
      </Layout>
    </>
  );
};
export const getServerSideProps = authCheck(true);

export default ViewBatch;
