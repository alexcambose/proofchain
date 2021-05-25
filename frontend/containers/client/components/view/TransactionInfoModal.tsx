import Modal from '@components/Modal';
import VerticalTable from '@components/table/VerticalTable';
import TransactionLink from '@components/TransactionLink';
import * as React from 'react';
import { useEffect, useState } from 'react';
import ClientBatchInfo from './info/ClientBatchInfo';
import ClientMaterialInfo from './info/ClientMaterialInfo';

interface ITransactionInfoModalProps {
  hash: string;
  onClose: () => void;
}

const TransactionInfoModal: React.FunctionComponent<ITransactionInfoModalProps> =
  ({ hash, onClose }) => {
    const [isOpened, setIsOpened] = useState(false);
    const handleClose = () => {
      onClose();
      setIsOpened(false);
    };
    useEffect(() => {
      if (hash) setIsOpened(true);
    }, [hash]);
    if (!hash) return null;
    return (
      <Modal
        isWide
        header={'Transaction info'}
        opened={isOpened}
        onClose={handleClose}
      >
        <VerticalTable
          items={{
            'Transaction Hash': <TransactionLink full>{hash}</TransactionLink>,
          }}
          withTransactionDetails={hash}
        />
      </Modal>
    );
  };

export default TransactionInfoModal;
