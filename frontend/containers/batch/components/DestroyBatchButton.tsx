import Button from '@components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import transactionWrapper from '@utils/transactionWrapper';
import proofchain from 'proofchain';
import * as React from 'react';
import { useState } from 'react';

interface IDestroyBatchButtonProps {
  batchId: number;
  onSuccess?: () => void;
}

const DestroyBatchButton: React.FunctionComponent<IDestroyBatchButtonProps> = ({
  batchId,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const onDestroyBatchClick = async () => {
    setIsLoading(true);

    const result = await transactionWrapper(() =>
      proofchain().batch.destroyBatch(batchId)
    );
    if (result) {
      onSuccess && onSuccess();
    }
    setIsLoading(false);
  };

  return (
    <Button
      disabled={isLoading}
      isLoading={isLoading}
      fullWidth={false}
      onClick={onDestroyBatchClick}
    >
      <FontAwesomeIcon icon="trash" /> Destroy Batch
    </Button>
  );
};

export default DestroyBatchButton;
