import CenteredContainer from '@components/layout/CenteredContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { State } from '@store/index';
import pluralize from 'pluralize';
import proofchain from 'proofchain';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useStore } from 'react-redux';
import GridBase, { shouldBeDisabled } from './GridBase';

interface IBatchCardProps {}
export const gridConfig = {
  i: 'Batch Card',
  lg: {
    i: 'Batch Card',
    x: 4,
    y: 0,
    w: 2,
    h: 4,
    minW: 2,
    minH: 4,
  },
md: {
    i: 'Batch Card',
    x: 4,
    y: 0,
    w: 2,
    h: 4,
    minW: 2,
    minH: 4,
  },
};
const BatchCard: React.FunctionComponent<IBatchCardProps> = (props) => {
  const user = useSelector((state: State) => state.user);
  const isDisabled = shouldBeDisabled(
    'batch',
    user.companyEntityType,
    user.entityType
  );
  const [batches, setBatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      if (isDisabled) return;
      setIsLoading(true);

      setBatches(await proofchain().batch.all());
      setIsLoading(false);
    })();
  }, []);
  return (
    <GridBase
      isDisabled={isDisabled}
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
