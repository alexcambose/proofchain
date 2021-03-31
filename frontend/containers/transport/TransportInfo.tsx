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
import TransportTimeline from './components/view/TransportTimeline';
import { Card, StyledAction } from 'baseui/card';
import { Button, SIZE } from 'baseui/button';
import CreateTransportEventForm from './components/form/CreateTransportEventForm';
import TransportStatusTag from '@components/tag/TransportStatusTag';
import FinaliseTransportForm from './components/form/FinaliseTransportForm';

interface ITransportInfoProps {
  transportId: number;
}
const TransportInfo: React.FC<ITransportInfoProps> = ({ transportId }) => {
  const address = useSelector((state: State) => state.user.address);
  const { transport, batchInfo, createdTimestamp, events } = useSelector(
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
      <Card
        title="Events"
        overrides={{
          Root: {
            style: ({ $theme }) => ({
              marginBottom: $theme.sizing.scale300,
            }),
          },
        }}
      >
        <Grid2
          left={
            <TransportTimeline
              createEvent={{
                ...transport.events.TransportInitiated,
                timestamp: createdTimestamp,
              }}
              transportEvents={events}
            />
          }
          right={
            <>{
            address === transport.transportCompany && (
              <StyledAction>
                <CreateTransportEventForm
                  transportStatus={transport.status}
                  transportId={transport.transportId}
                />
              </StyledAction>
            )}
            {address === transport.receiver && <FinaliseTransportForm transport={transport}/>}</>
          }
        />
      </Card>
      <Grid2
        left={
          <>
            <VerticalTable
              withTransactionDetails={
                transport.events.TransportInitiated.transactionHash
              }
              items={{
                Id: transport.transportId,
                'Current status': (
                  <TransportStatusTag
                    transportStatus={transport.status}
                  ></TransportStatusTag>
                ),
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
