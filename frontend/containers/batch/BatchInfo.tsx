import Button from '@components/Button';
import SpacedLayout from '@components/layout/SpacedLayout';
import Grid2 from '@components/layout/Grid2';
import BackButton from '@components/navigation/BackButton';
import VerticalTable from '@components/table/VerticalTable';
import TimeIndicator from '@components/TimeIndicator';
import TransactionLink from '@components/TransactionLink';
import MaterialInventoryTable from '@containers/material/components/table/MaterialInventoryTable';
import { fetchBatchInfo } from '@store/batch/actions';
import { State } from '@store/index';
import { Skeleton } from 'baseui/skeleton';
import { Display4, Label1 } from 'baseui/typography';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DestroyBatchButton from './components/DestroyBatchButton';
import { useRouter } from 'next/router';

interface IBatchInfoProps {
  batchId: number;
}
const BatchInfo: React.FC<IBatchInfoProps> = ({ batchId }) => {
  const { batch, materialsInfo, createdTimestamp } = useSelector(
    (state: State) => state.batch.batchInfo
  );
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBatchInfo({ batchId }));
  }, []);
  const onBatchDestroyed = () => {
    router.replace('/batch');
  };
  if (!batch) {
    return <Skeleton rows={10} height="200px" width="100%" animation />;
  }
  return (
    <>
      <SpacedLayout>
        <BackButton />
        <DestroyBatchButton
          onSuccess={onBatchDestroyed}
          batchId={batch.batchId}
        />
      </SpacedLayout>
      <Grid2
        left={
          <>
            <Display4>{batch.code}</Display4>
            <VerticalTable
              withTransactionDetails={batch.events.BatchCreate.transactionHash}
              items={{
                Id: batch.batchId,
                Code: batch.code,
                Created: <TimeIndicator>{createdTimestamp}</TimeIndicator>,
                'Created Transaction': (
                  <TransactionLink>
                    {batch.events.BatchCreate.transactionHash}
                  </TransactionLink>
                ),
              }}
            />
          </>
        }
        right={<MaterialInventoryTable materialInfo={materialsInfo} />}
      />
    </>
  );
};
export default BatchInfo;
