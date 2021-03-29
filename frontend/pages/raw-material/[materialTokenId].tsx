import BackButton from '@components/navigation/BackButton';
import Button from '@components/Button';
import Layout from '@containers/Layout';
import MaterialInfo from '@containers/material/MaterialInfo';
import Materials from '@containers/material/Materials';
import { SIZE } from 'baseui/button';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { authCheck } from 'pages';
import React from 'react';

const ViewRawMaterial = () => {
  const router = useRouter();
  const { materialTokenId } = router.query;
  return (
    <>
      <Head>
        <title>Raw Material</title>
      </Head>

      <Layout>
        <BackButton />
        <MaterialInfo materialTokenId={parseInt(materialTokenId as string)} />
      </Layout>
    </>
  );
};
export const getServerSideProps = authCheck(true);

export default ViewRawMaterial;
