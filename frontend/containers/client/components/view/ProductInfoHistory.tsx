import { State } from '@store/index';
import { fetchCompanyInfo } from '@store/client/actions';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductHistoryVisualization from './ProductHistoryVisualisation';
import proofchain from 'proofchain';
import { EMPTY_ADDRESS } from '@utils/eth';

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
const generateHistory = async (materialUuid) => {
  const materialInstance = await proofchain().material.getMaterialByUuid(
    materialUuid,
    true
  );
  // MaterialTransfer mint
  const material = await proofchain().material.getById(
    materialInstance.materialTokenId
  );
  const children = [];
  for (let i = 0; i < materialInstance.fromBatchId.length; i++) {
    children[i] = await batchHistory(
      materialInstance.fromBatchId[i],
      materialInstance.batchMaterialsUuid[i]
    );
  }
  return {
    materialInstance: materialInstance,
    material,
    mintEvent: materialInstance.mintEvent,
    type: 'MATERIAL',
    children,
  };
};
const batchHistory = async (batchId, materialsUuid) => {
  const batchInstance = await proofchain().batch.getById(batchId);
  return {
    type: 'BATCH',
    batchInstance,
    children: await Promise.all(
      materialsUuid.map(async (e) => generateHistory(e))
    ),
  };
};

const ProductInfoHistory: React.FunctionComponent<IProductInfoHistoryProps> = ({
  uuid,
}) => {
  const [history, setHistory] = useState(null);

  const dispatch = useDispatch();
  const materialInstance = useSelector(
    (state: State) => state.client.information.materialInstance
  );
  useEffect(() => {
    (async () => {
      const h = await generateHistory(uuid);
      setHistory(h);
    })();
  }, []);
  if (!history) return null;
  return (
    <>
      <ProductHistoryVisualization history={history} />
    </>
  );
};

export default ProductInfoHistory;
