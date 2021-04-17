import Certificates from '@containers/certificate/Certificates';
import CompanyCertificate from '@containers/companyCertificate/CompanyCertificate';
import Layout from '@containers/Layout';
import { CompanyEntityTypeEnum, EntityTypeEnum } from '@enums';
import { State } from '@store/index';
import Head from 'next/head';
import { authCheck } from 'pages';
import React from 'react';
import { useSelector } from 'react-redux';

const Certificate = () => {
  const entityType = useSelector((state: State) => state.user.entityType);
  return (
    <>
      <Head>
        <title>All Certificates</title>
      </Head>
      {entityType === EntityTypeEnum.CERTIFICATE_AUTHORITY ? (
        <Layout title="All Certificates">
          <Certificates />
        </Layout>
      ) : (
        <Layout title="Assigned Certificates">
          <CompanyCertificate />
        </Layout>
      )}
    </>
  );
};
export const getServerSideProps = authCheck(true);

export default Certificate;
