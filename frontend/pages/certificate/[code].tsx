import BackButton from '@components/navigation/BackButton';
import CertificateInfo from '@containers/certificate/CertificateInfo';
import CompanyCertificateInfo from '@containers/companyCertificate/CompanyCertificateInfo';
import Layout from '@containers/Layout';
import { EntityTypeEnum } from '@enums';
import { State } from '@store/index';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { authCheck } from 'pages';
import React from 'react';
import { useSelector } from 'react-redux';

const ViewCertificate = () => {
  const router = useRouter();
  const { code } = router.query;
  const entityType = useSelector((state: State) => state.user.entityType);

  return (
    <>
      <Head>
        <title>Certificate</title>
      </Head>
      {entityType === EntityTypeEnum.CERTIFICATE_AUTHORITY ? (
        <Layout>
          <BackButton />
          <CertificateInfo certificateCode={parseInt(code as string)} />
        </Layout>
      ) : (
        <Layout>
          <BackButton />
          <CompanyCertificateInfo certificateCode={parseInt(code as string)} />
        </Layout>
      )}
    </>
  );
};
export const getServerSideProps = authCheck(true);

export default ViewCertificate;
