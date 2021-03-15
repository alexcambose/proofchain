import { State } from '@store/index';
import { fetchRawMaterials } from '@store/material/actions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RawMaterialsTable from './components/table/RawMaterialsTable';

const RawMaterials = () => {
  const dispatch = useDispatch();
  const rawMaterials = useSelector(
    (state: State) => state.material.rawMaterials
  );
  const loadingRawMaterials = useSelector(
    (state: State) => state.material.loadingRawMaterials
  );
  useEffect(() => {
    dispatch(fetchRawMaterials());
  }, []);
  return (
    <>
      <RawMaterialsTable
        isLoading={loadingRawMaterials}
        materials={rawMaterials}
      />
    </>
  );
};
export default RawMaterials;
