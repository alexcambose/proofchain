import LoadingSkeleton from '@components/loading/LoadingSkeleton';
import VerticalTable from '@components/table/VerticalTable';
import CompanyEntityTypeTag from '@components/tag/CompanyEntityTypeTag';
import { fetchCompanyInfo } from '@store/client/actions';
import { State } from '@store/index';
import { H3 } from 'baseui/typography';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface IProductInfoCompanyProps {}

const ProductInfoCompany: React.FunctionComponent<IProductInfoCompanyProps> = ({}) => {
  const dispatch = useDispatch();
  const company = useSelector(
    (state: State) => state.client.information.company
  );
  const material = useSelector(
    (state: State) => state.client.information.material
  );
  useEffect(() => {
    dispatch(fetchCompanyInfo());
  }, []);
  if (!company) return <LoadingSkeleton />;
  return (
    <>
      <H3>{company.name}</H3>
      <VerticalTable
        items={{
          Type: <CompanyEntityTypeTag entityType={company.entityType} />,
          Address: material.creator,
        }}
      />
    </>
  );
};

export default ProductInfoCompany;
