import { State } from '@store/index';
import { fetchCompanyInfo } from '@store/client/actions';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface IProductInfoHistoryProps {}

const ProductInfoHistory: React.FunctionComponent<IProductInfoHistoryProps> = ({}) => {
  const dispatch = useDispatch();
  const materialInstance = useSelector(
    (state: State) => state.client.information.materialInstance
  );
  return <>aa</>;
};

export default ProductInfoHistory;
