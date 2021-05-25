import {
  getBatchById,
  getMaterialById,
  getMaterialByUuid,
} from '@utils/cachable';
import LocalCache from '@utils/localCache';
import proofchain from 'proofchain';

const getBatchPastEvents = async (eventName, batchId) => {
  const cacheId = `event-batch-id-${batchId}-${eventName}`;
  const event = await LocalCache.cached(
    cacheId,
    proofchain().batch.getPastEvents(
      eventName,
      {
        batchId,
      },
      true
    )
  );
  return event;
};
export const generateHistory = async (
  uuid: number,
  onClick: (item: any) => void,
  setHistory: React.Dispatch<any>,
  insideRecursion = false
) => {
  const materialInstance = await getMaterialByUuid(uuid);
  // MaterialTransfer mint
  const material = await getMaterialById(materialInstance.materialTokenId);
  // main history object, to be modified afterwards
  const history = {
    materialInstance,
    material,
    mintEvent: materialInstance.mintEvent,
    type: 'MATERIAL',
    onClick,
    onHashClick: onClick,
    children: [],
  };
  // get batch information
  for (let i = 0; i < materialInstance.fromBatchId.length; i++) {
    const batchId = materialInstance.fromBatchId[i];
    const materialsUuid = materialInstance.batchMaterialsUuid[i];
    // get events
    const batchInstance = await getBatchById(batchId);
    const createEvent = await getBatchPastEvents(
      'BatchCreate',
      batchInstance.batchId
    );
    const child = {
      type: 'BATCH',
      batchInstance,
      material,
      createEvent: createEvent[0],
      children: [], //PARTIAL LOAD
      onClick,
      onHashClick: onClick,
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
