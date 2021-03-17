import Grid2 from '@components/layout/Grid2';
import NoPaddingGrid from '@components/layout/NoPaddingGrid';
import { State } from '@store/index';
import { fetchMaterialInfo } from '@store/material/actions';
import { Accordion, Panel } from 'baseui/accordion';
import { Skeleton } from 'baseui/skeleton';
import { Display4, Label1 } from 'baseui/typography';
import { IMaterial } from 'interface';
import proofchain from 'proofchain';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialInventoryTable from './components/table/MaterialInventoryTable';
import MaterialRecipeTable from './components/table/MaterialRecipeTable';
import MaterialBalancePanel from './components/view/MaterialBalancePanel';
import MaterialInventory from './components/view/MaterialInventory';

interface IMaterialInfoProps {
  materialTokenId: number;
}
const MaterialInfo: React.FC<IMaterialInfoProps> = ({ materialTokenId }) => {
  const { material, balance } = useSelector(
    (state: State) => state.material.materialInfo
  );
  const loadingMaterialInfo = useSelector(
    (state: State) => state.material.loadingMaterialInfo
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMaterialInfo({ materialTokenId }));
  }, []);
  if (loadingMaterialInfo || !material) {
    return <Skeleton rows={10} height="200px" width="100%" animation />;
  }
  return (
    <>
      <Display4>{material.name}</Display4>
      <Label1>{material.code}</Label1>
      {/* <MaterialRecipeTable
        materialTokenAmount={material.recipeMaterialAmount}
        materialTokenId={material.recipeMaterialTokenId}
      /> */}

      <Grid2
        left={
          <Accordion renderAll>
            <Panel title={'Balance - ' + balance}>
              <MaterialBalancePanel materialTokenId={materialTokenId} />
            </Panel>
            <Panel title="Panel 2">Content 2</Panel>
            <Panel title="Panel 3">Content 3</Panel>
          </Accordion>
        }
        right={<MaterialInventory materialTokenId={materialTokenId} />}
      />
    </>
  );
};
export default MaterialInfo;
