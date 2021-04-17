import CenteredContainer from '@components/layout/CenteredContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { State } from '@store/index';
import pluralize from 'pluralize';
import proofchain from 'proofchain';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import GridBase, { shouldBeDisabled } from './GridBase';

interface IRawMaterialCardProps {}
export const gridConfig = {
  i: 'Raw Material Card',
  lg: {
    i: 'Raw Material Card',

    x: 0,
    y: 0,
    w: 2,
    h: 4,
    minW: 2,
    minH: 4,
  },
  md: {
    i: 'Raw Material Card',

    x: 0,
    y: 0,
    w: 2,
    h: 4,
    minW: 2,
    minH: 4,
  },
};
const RawMaterialCard: React.FunctionComponent<IRawMaterialCardProps> = (
  props
) => {
  const user = useSelector((state: State) => state.user);
  const isDisabled = shouldBeDisabled(
    'material',
    user.companyEntityType,
    user.entityType
  );
  const [rawmaterials, setRawMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      if (isDisabled) return;
      setIsLoading(true);
      setRawMaterials(
        await proofchain().material.all({ onlyRawMaterials: true })
      );
      setIsLoading(false);
    })();
  }, []);
  return (
    <GridBase
      isDisabled={isDisabled}
      title="Raw Materials"
      icon={<FontAwesomeIcon icon="draw-polygon" />}
      isLoading={isLoading}
    >
      <CenteredContainer>
        {pluralize('raw material', rawmaterials.length, true)}
      </CenteredContainer>
    </GridBase>
  );
};

export default RawMaterialCard;
