import CenteredContainer from '@components/layout/CenteredContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import pluralize from 'pluralize';
import proofchain from 'proofchain';
import * as React from 'react';
import { useEffect, useState } from 'react';
import GridBase from './GridBase';

interface IBatchCardProps {}
export const gridConfig = {
  i: 'Batch Card',
  x: 4,
  y: 0,
  w: 2,
  h: 4,
  minW: 2,
  minH: 4,
};
const BatchCard: React.FunctionComponent<IBatchCardProps> = (props) => {
  const [batches, setBatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setBatches(await proofchain().batch.all());
      setIsLoading(false);
    })();
  }, []);
  return (
    <GridBase
      title="Batches"
      icon={<FontAwesomeIcon icon="boxes" />}
      isLoading={isLoading}
    >
      <CenteredContainer>
        {pluralize('batch', batches.length, true)}
      </CenteredContainer>
    </GridBase>
  );
};

export default BatchCard;
