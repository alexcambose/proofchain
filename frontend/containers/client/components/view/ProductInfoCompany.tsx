import LoadingSkeleton from '@components/loading/LoadingSkeleton';
import Tabs from '@components/tab/Tabs';
import VerticalTable from '@components/table/VerticalTable';
import CompanyEntityTypeTag from '@components/tag/CompanyEntityTypeTag';
import TimeIndicator from '@components/TimeIndicator';
import TransactionLink from '@components/TransactionLink';
import { fetchCompanyInfo } from '@store/client/actions';
import { State } from '@store/index';
import { ORIENTATION } from 'baseui/tabs-motion';
import { H3 } from 'baseui/typography';
import { IMaterial } from 'interface';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClientCompanyCertificates from './info/material/ClientMaterialCertificates';

interface IProductInfoCompanyProps {
  material: IMaterial;
}

const ProductInfoCompany: React.FunctionComponent<IProductInfoCompanyProps> = ({
  material,
}) => {
  const dispatch = useDispatch();
  const companyInfo = useSelector(
    (state: State) => state.client.information.companyInfo
  );
  useEffect(() => {
    dispatch(fetchCompanyInfo(material));
  }, []);
  if (!companyInfo) return <LoadingSkeleton />;
  console.log(companyInfo);
  const { company, createdEvent } = companyInfo;
  return (
    <>
      <H3>{company.name}</H3>
      <Tabs
        orientation={ORIENTATION.vertical}
        tabs={[
          {
            title: 'Information',
            content: (
              <VerticalTable
                items={{
                  Name: company.name,
                  Type: (
                    <CompanyEntityTypeTag entityType={company.entityType} />
                  ),
                  Address: material.creator,
                  Created: (
                    <TimeIndicator>
                      {createdEvent.block.timestamp}
                    </TimeIndicator>
                  ),
                  'Created Transaction': (
                    <TransactionLink>
                      {createdEvent.event.transactionHash}
                    </TransactionLink>
                  ),
                }}
              />
            ),
          },
          {
            title: 'Certificates',
            content: <ClientCompanyCertificates material={material} />,
          },
        ]}
      />
    </>
  );
};

export default ProductInfoCompany;
