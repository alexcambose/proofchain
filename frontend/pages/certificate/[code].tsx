import BackButton from '@components/BackButton';
import CertificateInfo from '@containers/certificate/CertificateInfo';
import Layout from '@containers/Layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { authCheck } from 'pages';
import React from 'react';

const ViewCertificate = () => {
  const router = useRouter();
  const { code } = router.query;
  return (
    <>
      <Head>
        <title>Certificate</title>
      </Head>

      <Layout>
        <BackButton />
        <CertificateInfo code={parseInt(code as string)} />
      </Layout>
    </>
  );
};
export const getServerSideProps = authCheck(true);

export default ViewCertificate;
