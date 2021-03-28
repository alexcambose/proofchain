import Layout from '@containers/Layout';
import Transports from '@containers/transport/Transports';
import YourTransports from '@containers/transport/YourTransports';
import { CompanyEntityTypeEnum } from '@enums';
import { State } from '@store/index';
import Head from 'next/head';
import { authCheck } from 'pages';
import React from 'react';
import { useSelector } from 'react-redux';

const TransportsPage = () => {
  const companyEntityType = useSelector(
    (state: State) => state.user.companyEntityType
  );
  const transportsManufacturerCompany = (
    <>
      <Head>
        <title>All Transports</title>
      </Head>

      <Layout title="All Transports">
        <Transports />{' '}
      </Layout>
    </>
  );
  const transportsLogisticCompany = (
    <>
      <Head>
        <title>Your Transports</title>
      </Head>

      <Layout title="Your Transports">
        <YourTransports />
      </Layout>
    </>
  );
  return companyEntityType === CompanyEntityTypeEnum.LOGISTIC
    ? transportsLogisticCompany
    : transportsManufacturerCompany;
};
export const getServerSideProps = authCheck(true);

export default TransportsPage;
