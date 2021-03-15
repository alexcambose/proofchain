import { State } from '@store/index';
import { fetchMaterials } from '@store/material/actions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialsTable from './components/table/MaterialsTable';

const Materials = () => {
  const dispatch = useDispatch();
  const materials = useSelector((state: State) => state.material.materials);
  const loadingMaterials = useSelector(
    (state: State) => state.material.loadingMaterials
  );
  useEffect(() => {
    dispatch(fetchMaterials());
  }, []);
  return (
    <>
      <MaterialsTable isLoading={loadingMaterials} materials={materials} />
    </>
  );
};
export default Materials;
