import { State } from '@store/index';
import React from 'react';
import { useSelector } from 'react-redux';
import MaterialInventoryTable from '../table/MaterialInventoryTable';
interface IMaterialInventoryProps {
  materialTokenId: number;
}
const MaterialInventory: React.FC<IMaterialInventoryProps> = ({
  materialTokenId,
}) => {
  const materialsInfo = useSelector(
    (state: State) => state.material.materialInfo.inventory
  );
  return <MaterialInventoryTable materialInfo={materialsInfo} />;
};

export default MaterialInventory;
