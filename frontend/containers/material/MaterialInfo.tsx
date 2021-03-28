import Grid2 from '@components/layout/Grid2';
import NoPaddingGrid from '@components/layout/NoPaddingGrid';
import LoadingSkeleton from '@components/loading/LoadingSkeleton';
import { State } from '@store/index';
import { fetchMaterialInfo } from '@store/material/actions';
import { Accordion, Panel } from 'baseui/accordion';
import { Skeleton } from 'baseui/skeleton';
import { Display4, Label1, Label2 } from 'baseui/typography';
import { IMaterial } from 'interface';
import proofchain from 'proofchain';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialInventoryTable from './components/table/MaterialInventoryTable';
import MaterialRecipeTable from './components/table/MaterialRecipeTable';
import MaterialBalancePanel from './components/view/MaterialBalancePanel';
import MaterialCertificatesPanel from './components/view/MaterialCertificatesPanel';
import MaterialInventory from './components/view/MaterialInventory';

interface IMaterialInfoProps {
  materialTokenId: number;
}
const MaterialInfo: React.FC<IMaterialInfoProps> = ({ materialTokenId }) => {
  const { material, balance } = useSelector(
    (state: State) => state.material.materialInfo
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMaterialInfo({ materialTokenId }));
  }, []);
  if (!material) {
    return <LoadingSkeleton />;
  }
  return (
    <>
      <Display4>{material.name}</Display4>
      <Label1>{material.code}</Label1>
      {material.recipeMaterialAmount.length > 0 && (
        <>
          <Label1>Recipe</Label1>
          <MaterialRecipeTable
            materialTokenAmount={material.recipeMaterialAmount}
            materialTokenId={material.recipeMaterialTokenId}
          />
        </>
      )}

      <Grid2
        left={
          <Accordion>
            <Panel title={'Balance - ' + balance}>
              <MaterialBalancePanel materialTokenId={materialTokenId} />
            </Panel>
            <Panel title={'Certificates'}>
              <MaterialCertificatesPanel materialTokenId={materialTokenId} />
            </Panel>
          </Accordion>
        }
        right={<MaterialInventory materialTokenId={materialTokenId} />}
      />
    </>
  );
};
export default MaterialInfo;
