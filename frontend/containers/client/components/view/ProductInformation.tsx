import { IMaterial } from 'interface';
import * as React from 'react';

interface IProductInformationProps {
  material: IMaterial;
  uuid: number;
}

const ProductInformation: React.FunctionComponent<IProductInformationProps> = ({
  material,
  uuid,
}) => {
  return <> </>;
};

export default ProductInformation;
