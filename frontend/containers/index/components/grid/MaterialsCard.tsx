import CenteredContainer from '@components/layout/CenteredContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { State } from '@store/index';
import pluralize from 'pluralize';
import proofchain from 'proofchain';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import GridBase, { shouldBeDisabled } from './GridBase';

interface IMaterialCardProps {}
export const gridConfig = {
  i: 'Material Card',
  lg: {
    i: 'Material Card',

    x: 2,
    y: 0,
    w: 2,
    h: 4,
    minW: 2,
    minH: 4,
  },
  md: {
    i: 'Material Card',

    x: 2,
    y: 0,
    w: 2,
    h: 4,
    minW: 2,
    minH: 4,
  },
};
const MaterialCard: React.FunctionComponent<IMaterialCardProps> = (props) => {
  const user = useSelector((state: State) => state.user);
  const isDisabled = shouldBeDisabled(
    'material',
    user.companyEntityType,
    user.entityType
  );
  const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      if (isDisabled) return;
      setIsLoading(true);
      setMaterials(await proofchain().material.all({ onlyMaterials: true }));
      setIsLoading(false);
    })();
  }, []);
  return (
    <GridBase
      isDisabled={isDisabled}
      title="Materials"
      icon={<FontAwesomeIcon icon="dot-circle" />}
      isLoading={isLoading}
    >
      <CenteredContainer>
        {pluralize('material', materials.length, true)}
      </CenteredContainer>
    </GridBase>
  );
};

export default MaterialCard;
