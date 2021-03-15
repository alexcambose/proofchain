import { State } from '@store/index';
import { fetchBatches } from '@store/batch/actions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BatchesTable from './components/table/BatchesTable';

const Batches = () => {
  const dispatch = useDispatch();
  const batches = useSelector((state: State) => state.batch.batches);
  const loadingBatches = useSelector(
    (state: State) => state.batch.loadingBatches
  );
  useEffect(() => {
    dispatch(fetchBatches());
  }, []);
  return (
    <>
      <BatchesTable isLoading={loadingBatches} batches={batches} />
    </>
  );
};
export default Batches;
