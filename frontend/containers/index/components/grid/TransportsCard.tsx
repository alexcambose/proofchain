import CenteredContainer from '@components/layout/CenteredContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import pluralize from 'pluralize';
import proofchain from 'proofchain';
import * as React from 'react';
import { useEffect, useState } from 'react';
import GridBase from './GridBase';

interface ITransportCardProps {}
export const gridConfig = {
  i: 'Transport Card',
  x: 6,
  y: 0,
  w: 2,
  h: 4,
  minW: 2,
  minH: 4,
};
const TransportCard: React.FunctionComponent<ITransportCardProps> = (props) => {
  const [transports, setTransports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setTransports(await proofchain().transport.all());
      setIsLoading(false);
    })();
  }, []);
  return (
    <GridBase
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
