import { State } from '@store/index';
import { fetchMaterialInfo } from '@store/client/actions';
import { FILL, StatefulTabs, Tab } from 'baseui/tabs-motion';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductInfoCompany from './components/view/ProductInfoCompany';
import ProductInfoHistory from './components/view/ProductInfoHistory';
import { Cell, Grid } from 'baseui/layout-grid';
import Container from '@components/layout/Container';
import { Display3, Display4, H1, H5, Label1 } from 'baseui/typography';
import LoadingSkeleton from '@components/loading/LoadingSkeleton';

interface IClientProductInfoProps {
  uuid: number;
}

const ClientProductInfo: React.FunctionComponent<IClientProductInfoProps> = ({
  uuid,
}) => {
  const dispatch = useDispatch();
  const material = useSelector(
    (state: State) => state.client.information.material
  );
  useEffect(() => {
    dispatch(fetchMaterialInfo({ uuid }));
  }, []);
  if (!material) return <LoadingSkeleton />;
  return (
    <Container>
      <H1>{material.name}</H1>
      <Label1>{material.code}</Label1>
      <StatefulTabs fill={FILL.fixed}>
        <Tab title="Information">
          <ProductInfoHistory uuid={uuid} />
        </Tab>
        <Tab title="Company">
          <ProductInfoCompany />
        </Tab>
      </StatefulTabs>
    </Container>
  );
};

export default ClientProductInfo;
