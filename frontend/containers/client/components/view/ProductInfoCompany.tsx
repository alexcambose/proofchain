import { State } from '@store/index';
import { fetchCompanyInfo } from '@store/client/actions';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface IProductInfoCompanyProps {}

const ProductInfoCompany: React.FunctionComponent<IProductInfoCompanyProps> = ({}) => {
  const dispatch = useDispatch();
  const company = useSelector(
    (state: State) => state.client.information.company
  );
  useEffect(() => {
    dispatch(fetchCompanyInfo());
  }, []);
  return <>{JSON.stringify(company)}</>;
};

export default ProductInfoCompany;
