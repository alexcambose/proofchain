import Button from '@components/Button';
import Container from '@components/layout/Container';
import LoadingSkeleton from '@components/loading/LoadingSkeleton';
import { fetchMaterialInfo } from '@store/client/actions';
import { State } from '@store/index';
import { KIND } from 'baseui/button';
import ArrowLeft from 'baseui/icon/arrow-left';
import { FILL, StatefulTabs, Tab } from 'baseui/tabs-motion';
import { H1, Label1 } from 'baseui/typography';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductInfoCompany from './components/view/ProductInfoCompany';
import ProductInfoHistory from './components/view/ProductInfoHistory';
interface IClientProductInfoProps {
  uuid: number;
}

const ClientProductInfo: React.FunctionComponent<IClientProductInfoProps> = ({
  uuid,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const material = useSelector(
    (state: State) => state.client.information.material
  );
  useEffect(() => {
    dispatch(fetchMaterialInfo({ uuid }));
  }, []);
  const onBackClick = () => {
    router.push('/client');
  };
  if (!material) return <LoadingSkeleton />;
  return (
    <Container>
      <Button onClick={onBackClick} kind={KIND.secondary}>
        <ArrowLeft />
        Scan another product
      </Button>
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
