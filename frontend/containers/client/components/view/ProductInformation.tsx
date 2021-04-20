import LoadingOverlay from '@components/loading/LoadingOverlay';
import { getMaterialByUuid } from '@utils/cachable';
import { IMaterial } from 'interface';
import * as React from 'react';
import { useEffect, useState } from 'react';
import ClientMaterialInfo from './info/ClientMaterialInfo';

interface IProductInformationProps {
  material: IMaterial;
  uuid: number;
}

const ProductInformation: React.FunctionComponent<IProductInformationProps> = ({
  material,
  uuid,
}) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    (async () => {
      const materialInstance = await getMaterialByUuid(uuid);
      const mintEvent = materialInstance.mintEvent;
      setData({ materialInstance, mintEvent });
    })();
  }, []);
  if (!data) return <LoadingOverlay />;
  return (
    <>
      <ClientMaterialInfo
        material={material}
        materialInstance={data.materialInstance}
        mintEvent={data.mintEvent}
      />
    </>
  );
};

export default React.memo(ProductInformation);
