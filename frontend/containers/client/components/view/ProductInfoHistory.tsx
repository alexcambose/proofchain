import LoadingSkeleton from '@components/loading/LoadingSkeleton';
import { generateHistory } from '@containers/client/utils';
import { State } from '@store/index';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductHistoryVisualization from './ProductHistoryVisualisation';
import ProductInfoModal from './ProductInfoModal';
import TransactionInfoModal from './TransactionInfoModal';
interface IProductInfoHistoryProps {
  uuid: number;
}

const ProductInfoHistory: React.FunctionComponent<IProductInfoHistoryProps> = ({
  uuid,
}) => {
  const [history, setHistory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);
  const dispatch = useDispatch();
  const materialInstance = useSelector(
    (state: State) => state.client.information.materialInstance
  );
  const onClick = (item) => {
    setSelectedHistoryItem(item);
  };
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const h = await generateHistory(uuid, onClick, setHistory);
      setHistory(h);
      setIsLoading(false);
    })();
  }, []);

  if (!history) return <LoadingSkeleton />;
  return (
    <>
      {typeof selectedHistoryItem == 'string' ? (
        <TransactionInfoModal
          onClose={() => setSelectedHistoryItem(null)}
          hash={selectedHistoryItem}
        />
      ) : (
        <ProductInfoModal
          onClose={() => setSelectedHistoryItem(null)}
          historyItem={selectedHistoryItem}
        />
      )}
      <ProductHistoryVisualization isLoading={isLoading} history={history} />
    </>
  );
};

export default ProductInfoHistory;
