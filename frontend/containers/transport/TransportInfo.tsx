import Grid2 from '@components/layout/Grid2';
import VerticalTable from '@components/table/VerticalTable';
import TimeIndicator from '@components/TimeIndicator';
import TransactionLink from '@components/TransactionLink';
import MaterialInventoryTable from '@containers/material/components/table/MaterialInventoryTable';
import { fetchTransportInfo } from '@store/transport/actions';
import { State } from '@store/index';
import { Skeleton } from 'baseui/skeleton';
import { Display4, Label1 } from 'baseui/typography';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TransportBatchesTable from './components/table/TransportBatchesTable';

interface ITransportInfoProps {
  transportId: number;
}
const TransportInfo: React.FC<ITransportInfoProps> = ({ transportId }) => {
  const { transport, batchInfo, createdTimestamp } = useSelector(
    (state: State) => state.transport.transportInfo
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTransportInfo({ transportId }));
  }, []);
  if (!transport) {
    return <Skeleton rows={10} height="200px" width="100%" animation />;
  }
  return (
    <>
      <Grid2
        left={
          <>
            <VerticalTable
              items={{
                Id: transport.transportId,
                Created: <TimeIndicator>{createdTimestamp}</TimeIndicator>,
                'Create Transaction': (
                  <TransactionLink>
                    {transport.events.TransportInitiated.transactionHash}
                  </TransactionLink>
                ),
              }}
            />
          </>
        }
        right={<TransportBatchesTable transportbatches={batchInfo} />}
      />
    </>
  );
};
export default TransportInfo;
