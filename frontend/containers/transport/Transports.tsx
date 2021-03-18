import { State } from '@store/index';
import { fetchTransports } from '@store/transport/actions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TransportsTable from './components/table/TransportsTable';

const Transports = () => {
  const dispatch = useDispatch();
  const transports = useSelector((state: State) => state.transport.transports);
  const loadingTransports = useSelector(
    (state: State) => state.transport.loadingTransports
  );
  useEffect(() => {
    dispatch(fetchTransports());
  }, []);
  return (
    <>
      <TransportsTable isLoading={loadingTransports} transports={transports} />
    </>
  );
};
export default Transports;
