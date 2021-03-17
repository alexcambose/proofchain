import { State } from '@store/index';
import { Cell, Grid } from 'baseui/layout-grid';
import { Label1, H6 } from 'baseui/typography';
import React from 'react';
import { useSelector } from 'react-redux';
import MintMaterialForm from '../form/MintMaterialForm';
import MaterialMintTable from '../table/MaterialMintTable';

interface IMaterialBalancePanelProps {
  materialTokenId: number;
}
const MaterialBalancePanel: React.FC<IMaterialBalancePanelProps> = ({
  materialTokenId,
}) => {
  const { material, balance, transfers } = useSelector(
    (state: State) => state.material.materialInfo
  );
  return (
    <>
      <Label1>
        Current balance: <strong>{balance}</strong>
      </Label1>
      <MintMaterialForm
        isRawMaterial={material.recipeMaterialAmount.length === 0}
        materialTokenId={materialTokenId}
        amountIdentifier={material.amountIdentifier}
      />
    </>
  );
};
export default MaterialBalancePanel;
