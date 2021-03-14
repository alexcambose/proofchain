import { State } from '@store/index';
import { fetchRawMaterials } from '@store/material/actions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RawMaterialsTable from './components/RawMaterialsTable';

const Materials = () => {
  const dispatch = useDispatch();
  const Materials = useSelector((state: State) => state.material.materials);
  const loadingMaterials = useSelector(
    (state: State) => state.material.loadingMaterials
  );
  useEffect(() => {
    dispatch(fetchMaterials());
  }, []);
  return (
    <>
      <MaterialsTable loading={loadingMaterials} materials={Materials} />
    </>
  );
};
export default Materials;
