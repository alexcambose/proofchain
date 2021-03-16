import Table from '@components/table/Table';
import TransactionLink from '@components/TransactionLink';
import { IMaterial, IMaterialTransfer } from 'interface';
import proofchain from 'proofchain';
import React, { useEffect, useState } from 'react';
interface IMaterialRecipeTableProps {
  materialTokenId: number[];
  materialTokenAmount: number[];
}

const MaterialRecipeTable: React.FC<IMaterialRecipeTableProps> = ({
  materialTokenId,
  materialTokenAmount,
}) => {
  const [requiredMaterials, setRequiredMaterials] = useState<IMaterial[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const loadMaterials = async () => {
    console.log(materialTokenId, materialTokenAmount);
    setIsLoading(true);
    setRequiredMaterials(
      await Promise.all(
        materialTokenId.map((id) => proofchain().material.getById(id))
      )
    );
    setIsLoading(false);
  };
  useEffect(() => {
    loadMaterials();
  }, []);
  if (isLoading || requiredMaterials.length === 0) {
    return null;
  }
  return (
    <Table
      isLoading={isLoading}
      columns={['Material Token Id', 'Material name', 'Amount']}
      data={
        !(isLoading || requiredMaterials.length === 0) &&
        materialTokenId.map((e, i) => [
          e,
          requiredMaterials[i].name,
          materialTokenAmount[i] + ' ' + requiredMaterials[i].amountIdentifier,
        ])
      }
      emptyMessage={'No transfers'}
    />
  );
};

export default MaterialRecipeTable;
