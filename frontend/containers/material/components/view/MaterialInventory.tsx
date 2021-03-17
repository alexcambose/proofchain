import Table from '@components/table/Table';
import TransactionLink from '@components/TransactionLink';
import { State } from '@store/index';
import React, { useEffect, useState } from 'react';
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
  const isLoading = useSelector(
    (state: State) => state.material.loadingMaterialInfo
  );
  return (
    <MaterialInventoryTable
      isLoading={isLoading}
      materialInfo={materialsInfo}
    />
  );
};

export default MaterialInventory;
