import { fetchMaterialInfo } from '@store/client/actions';
import { FILL, StatefulTabs, Tab } from 'baseui/tabs-motion';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ProductInfoCompany from './components/view/ProductInfoCompany';
import ProductInfoHistory from './components/view/ProductInfoHistory';

interface IClientProductInfoProps {
  uuid: number;
}

const ClientProductInfo: React.FunctionComponent<IClientProductInfoProps> = ({
  uuid,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMaterialInfo({ uuid }));
  }, []);
  return (
    <StatefulTabs fill={FILL.fixed}>
      <Tab title="Information">
        <ProductInfoHistory />
      </Tab>
      <Tab title="Company">
        <ProductInfoCompany />
      </Tab>
    </StatefulTabs>
  );
};

export default ClientProductInfo;
