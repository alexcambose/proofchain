import BackButton from '@components/BackButton';
import Button from '@components/Button';
import Layout from '@containers/Layout';
import MaterialInfo from '@containers/material/MaterialInfo';
import Materials from '@containers/material/Materials';
import { SIZE } from 'baseui/button';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const ViewMaterial = () => {
  const router = useRouter();
  const { materialTokenId } = router.query;
  return (
    <>
      <Head>
        <title>Material</title>
      </Head>

      <Layout>
        <BackButton />
        <MaterialInfo materialTokenId={parseInt(materialTokenId as string)} />
      </Layout>
    </>
  );
};
export default ViewMaterial;
