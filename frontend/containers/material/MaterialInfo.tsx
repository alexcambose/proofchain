import { State } from '@store/index';
import { fetchMaterialInfo } from '@store/material/actions';
import { Accordion, Panel } from 'baseui/accordion';
import { Skeleton } from 'baseui/skeleton';
import { Display4, Label1 } from 'baseui/typography';
import { IMaterial } from 'interface';
import proofchain from 'proofchain';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialBalancePanel from './components/view/MaterialBalancePanel';

interface IMaterialInfoProps {
  materialTokenId: number;
}
const MaterialInfo: React.FC<IMaterialInfoProps> = ({ materialTokenId }) => {
  const material = useSelector(
    (state: State) => state.material.materialInfo.material
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
      <Accordion onChange={({ expanded }) => console.log(expanded)}>
        <Panel title="Balance">
          <MaterialBalancePanel materialTokenId={materialTokenId} />
        </Panel>
        <Panel title="Panel 2">Content 2</Panel>
        <Panel title="Panel 3">Content 3</Panel>
      </Accordion>
    </>
  );
};
export default MaterialInfo;
