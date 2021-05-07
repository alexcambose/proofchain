import Button from '@components/Button';
import Container from '@components/layout/Container';
import LoadingSkeleton from '@components/loading/LoadingSkeleton';
import Tabs from '@components/tab/Tabs';
import { fetchMaterialInfo } from '@store/client/actions';
import { State } from '@store/index';
import { KIND } from 'baseui/button';
import ArrowLeft from 'baseui/icon/arrow-left';
import { FILL } from 'baseui/tabs-motion';
import { H1, Label1 } from 'baseui/typography';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClientLoadingOverlay from './components/ClientLoadingOverlay';
import ProductInfoCompany from './components/view/ProductInfoCompany';
import ProductInfoHistory from './components/view/ProductInfoHistory';
import ProductInformation from './components/view/ProductInformation';
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
  const [overlayVisible, setOverlayVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setOverlayVisible(false);
    }, 3000);
    dispatch(fetchMaterialInfo({ uuid }));
  }, []);
  const onBackClick = () => {
    router.push('/client');
  };
  return (
    <Container>
      <ClientLoadingOverlay isVisible={overlayVisible} />
      <Button onClick={onBackClick} kind={KIND.secondary}>
        <ArrowLeft />
        Scan another product
      </Button>
      {material && !overlayVisible && (
        <>
          <H1>{material.name}</H1>
          <Label1>{material.code}</Label1>
          <Tabs
            renderAll
            tabs={[
              {
                title: 'Information',
                content: <ProductInformation material={material} uuid={uuid} />,
              },
              {
                title: 'Material graph',
                content: <ProductInfoHistory uuid={uuid} />,
              },
              {
                title: 'Company',
                content: <ProductInfoCompany material={material} />,
              },
            ]}
            fill={FILL.fixed}
          />
        </>
      )}
    </Container>
  );
};

export default React.memo(ClientProductInfo);
