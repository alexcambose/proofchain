import CenteredContainer from '@components/layout/CenteredContainer';
import CompanyEntityTypeTag from '@components/tag/CompanyEntityTypeTag';
import { CompanyEntityTypeEnum, EntityTypeEnum } from '@enums';
import { State } from '@store/index';
import { IUser } from '@store/user/interface';
import { styled, useStyletron } from 'baseui';
import { Display4, Label3, Paragraph4 } from 'baseui/typography';
import * as React from 'react';
import { useSelector } from 'react-redux';
import GridBase from './GridBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingSkeleton from '@components/loading/LoadingSkeleton';
import TimeIndicator from '@components/TimeIndicator';
import { useEffect, useState } from 'react';
import proofchain from 'proofchain';
import pluralize from 'pluralize';

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
