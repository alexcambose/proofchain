import LoadingSkeleton from '@components/loading/LoadingSkeleton';
import { State } from '@store/index';
import { EMPTY_ADDRESS } from '@utils/eth';
import { Block } from 'baseui/block';
import proofchain from 'proofchain';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductHistoryVisualization from './ProductHistoryVisualisation';
import ProductInfoModal from './ProductInfoModal';
interface IProductInfoHistoryProps {
  uuid: number;
}

enum MaterialHistoryEvents {
  BATCH_CREATE,
}

const fetchMaterialHistory = async (materialUuid, history = []) => {
  const materialInstance = await proofchain().material.getMaterialByUuid(
    materialUuid,
    true
  );

  console.log(materialInstance);
  // MaterialTransfer mint
  const mintEvent = materialInstance.mintEvent;

  // added to batch event
  const allBatchCreateEvents = (
    await proofchain().batch.getPastEvents(
      'BatchCreate',
      {
        materialTokenId: materialInstance.materialTokenId,
      },
      true
    )
  )
    // @ts-ignore
    .filter((e) => e.uuids.indexOf(mintEvent.uuid) !== -1);
  history.push(...allBatchCreateEvents);
  const transportEvents = await proofchain().transport.getPastEvents(
    'TransportCreated',
    {},
    true
  );
  for (let batchCreateEvent of allBatchCreateEvents) {
    for (let transportEvent of transportEvents) {
      const batchIds = await proofchain().transport.getBatchIds(
        // @ts-ignore
        transportEvent.transportId
      );
      // @ts-ignore
      if (batchIds.indexOf(batchCreateEvent.batchId) !== -1) {
        history.push(transportEvent);
      }
    }
  }
  const allMintEvents = await proofchain().material.getPastEvents(
    'MaterialTransfer',
    {
      from: EMPTY_ADDRESS,
    },
    true
  );
  // for (let minetEvent of allMintEvents) {
  //   for (let transportEvent of transportEvents) {
  //     const batchIds = await proofchain().transport.getBatchIds(
  //       // @ts-ignore
  //       transportEvent.transportId
  //     );
  //     // @ts-ignore
  //     if (batchIds.indexOf(batchCreateEvent.batchId) !== -1) {
  //       history.push(transportEvent);
  //     }
  //   }
  // }
  // const destroyBatchEvents = await proofchain().batch.getPastEvents(
  //   'BatchTransfer',
  //   { to: EMPTY_ADDRESS },
  //   true
  // );
  console.log(history);
  //
};
const generateHistory = async (
  materialUuid,
  onClick,
  setHistory,
  insideRecursion = false
) => {
  const materialInstance = await proofchain().material.getMaterialByUuid(
    materialUuid,
    true
  );
  // MaterialTransfer mint
  const material = await proofchain().material.getById(
    materialInstance.materialTokenId
  );
  // main history object, to be modified afterwards
  const history = {
    materialInstance,
    material,
    mintEvent: materialInstance.mintEvent,
    type: 'MATERIAL',
    onClick,
    children: [],
  };
  // get batch information
  for (let i = 0; i < materialInstance.fromBatchId.length; i++) {
    const batchId = materialInstance.fromBatchId[i];
    const materialsUuid = materialInstance.batchMaterialsUuid[i];
    // get events
    const batchInstance = await proofchain().batch.getById(batchId);
    const createEvent = await proofchain().batch.getPastEvents(
      'BatchCreate',
      {
        batchId: batchInstance.batchId,
      },
      true
    );
    const child = {
      type: 'BATCH',
      batchInstance,
      material,
      createEvent: createEvent[0],
      children: [], //PARTIAL LOAD
      onClick,
    };
    history.children[i] = child;
  }
  if (!insideRecursion) setHistory({ ...history });
  for (let i = 0; i < materialInstance.fromBatchId.length; i++) {
    const materialsUuid = materialInstance.batchMaterialsUuid[i];
    // history.children[i].children = await Promise.all(
    //   materialsUuid.map(async (e) => generateHistory(e, setHistory, true))
    // );
    for (let j = 0; j < materialsUuid.length; j++) {
      history.children[i].children[j] = await generateHistory(
        materialsUuid[j],
        onClick,
        setHistory,
        true
      );
      if (!insideRecursion) setHistory({ ...history });
    }
  }
  return history;
};

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
    console.log(item);
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
      <ProductInfoModal
        onClose={() => setSelectedHistoryItem(null)}
        historyItem={selectedHistoryItem}
      />
      <ProductHistoryVisualization isLoading={isLoading} history={history} />
    </>
  );
};

export default ProductInfoHistory;
