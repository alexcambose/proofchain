import Table from '@components/table/Table';
import TransactionLink from '@components/TransactionLink';
import { IMaterialInfo, IMaterialTransfer } from 'interface';
import proofchain from 'proofchain';
import React, { useEffect, useState } from 'react';
import MaterialInventoryTable from '../table/MaterialInventoryTable';
interface IMaterialInventoryProps {
  materialTokenId: number;
}
const MaterialInventory: React.FC<IMaterialInventoryProps> = ({
  materialTokenId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [materialsInfo, setMaterialsInfo] = useState<IMaterialInfo[]>([]);
  const getMaterialsInfo = async (materialTokenId) => {
    setIsLoading(true);
    const materials = await proofchain().material.getOwnedMaterialsUuid(
      materialTokenId
    );
    setMaterialsInfo(materials);
    setIsLoading(false);
  };
  useEffect(() => {
    getMaterialsInfo(materialTokenId);
  }, []);
  return (
    <MaterialInventoryTable
      isLoading={isLoading}
      materialInfo={materialsInfo}
    />
  );
};

export default MaterialInventory;
