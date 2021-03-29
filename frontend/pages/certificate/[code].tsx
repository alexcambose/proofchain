import BackButton from '@components/navigation/BackButton';
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
        <CertificateInfo certificateCode={parseInt(code as string)} />
      </Layout>
    </>
  );
};
export const getServerSideProps = authCheck(true);

export default ViewCertificate;
