import CenteredContainer from '@components/layout/CenteredContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { State } from '@store/index';
import pluralize from 'pluralize';
import proofchain from 'proofchain';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import GridBase, { shouldBeDisabled } from './GridBase';

interface ITransportCardProps {}
export const gridConfig = {
  i: 'Transport Card',
  lg: {
    x: 6,
    y: 0,
    w: 2,
    h: 4,
    minW: 2,
    minH: 4,
  },
  md: {
    x: 6,
    y: 0,
    w: 2,
    h: 4,
    minW: 2,
    minH: 4,
  },
};
const TransportCard: React.FunctionComponent<ITransportCardProps> = (props) => {
  const user = useSelector((state: State) => state.user);

  const isDisabled = shouldBeDisabled(
    'material',
    user.companyEntityType,
    user.entityType
  );
  const [transports, setTransports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      if (isDisabled) return;
      setIsLoading(true);
      setTransports(await proofchain().transport.all());
      setIsLoading(false);
    })();
  }, []);
  return (
    <GridBase
      isDisabled={isDisabled}
      title="Transports"
      icon={<FontAwesomeIcon icon="truck" />}
      isLoading={isLoading}
    >
      <CenteredContainer>
        {pluralize('transport', transports.length, true)}
      </CenteredContainer>
    </GridBase>
  );
};

export default TransportCard;
