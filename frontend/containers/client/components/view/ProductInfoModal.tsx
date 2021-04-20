import Modal from '@components/Modal';
import * as React from 'react';
import { useEffect, useState } from 'react';
import ClientBatchInfo from './info/ClientBatchInfo';
import ClientMaterialInfo from './info/ClientMaterialInfo';

interface IProductInfoModalProps {
  historyItem: any;
  onClose: () => void;
}

const ProductInfoModal: React.FunctionComponent<IProductInfoModalProps> = ({
  historyItem,
  onClose,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  useEffect(() => {
    if (historyItem) setIsOpened(true);
  }, [historyItem]);
  const handleClose = () => {
    onClose();
    setIsOpened(false);
  };
  if (!historyItem) return null;
  const info = {
    MATERIAL: {
      title: 'Material information',
      component: () => (
        <ClientMaterialInfo
          material={historyItem.material}
          materialInstance={historyItem.materialInstance}
          mintEvent={historyItem.mintEvent}
        />
      ),
    },
    BATCH: {
      title: 'Batch information',
      component: () => <ClientBatchInfo historyItem={historyItem} />,
    },
  };
  return (
    <Modal
      isWide
      header={info[historyItem.type].title}
      opened={isOpened}
      onClose={handleClose}
    >
      {info[historyItem.type].component()}
    </Modal>
  );
};

export default ProductInfoModal;
