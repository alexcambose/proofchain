import CenteredContainer from '@components/layout/CenteredContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import pluralize from 'pluralize';
import proofchain from 'proofchain';
import * as React from 'react';
import { useEffect, useState } from 'react';
import GridBase from './GridBase';

interface IMaterialCardProps {}
export const gridConfig = {
  i: 'Material Card',
  x: 4,
  y: 0,
  w: 2,
  h: 4,
  minW: 2,
  minH: 4,
};
const MaterialCard: React.FunctionComponent<IMaterialCardProps> = (props) => {
  const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setMaterials(await proofchain().material.all({ onlyMaterials: true }));
      setIsLoading(false);
    })();
  }, []);
  return (
    <GridBase
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
