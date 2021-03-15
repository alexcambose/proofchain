import { State } from '@store/index';
import { Cell, Grid } from 'baseui/layout-grid';
import { H6 } from 'baseui/typography';
import React from 'react';
import { useSelector } from 'react-redux';
import MintMaterialForm from '../forms/MintMaterialForm';

interface IMaterialBalancePanelProps {
  materialTokenId: number;
}
const MaterialBalancePanel: React.FC<IMaterialBalancePanelProps> = ({
  materialTokenId,
}) => {
  const materialInfo = useSelector(
    (state: State) => state.material.materialInfo
  );
  return (
    <Grid>
      <Cell span={[2, 4, 6]}>
        <H6>
          Current balance: <strong>{materialInfo.balance}</strong>
        </H6>
        <MintMaterialForm
          isRawMaterial={
            materialInfo.material.recipeMaterialAmount.length === 0
          }
          materialTokenId={materialTokenId}
        />
      </Cell>
      <Cell span={[2, 4, 6]}>b</Cell>
    </Grid>
  );
};
export default MaterialBalancePanel;
