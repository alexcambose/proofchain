import CenteredContainer from '@components/layout/CenteredContainer';
import TimeIndicator from '@components/TimeIndicator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { State } from '@store/index';
import { styled } from 'baseui';
import { Paragraph4 } from 'baseui/typography';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import web3Instance from 'web3Instance';
import GridBase from './GridBase';

interface INetworkCardProps {}
export const gridConfig = {
  i: 'Network Card',
  lg: {
    i: 'Network Card',

    x: 8,
    y: 0,
    w: 2,
    h: 4,
    minW: 2,
    minH: 4,
  },
  md: {
    i: 'Network Card',

    x: 8,
    y: 0,
    w: 2,
    h: 4,
    minW: 2,
    minH: 4,
  },
};
const List = styled('ul', {
  padding: 0,
  listStyleType: 'none',
  textAlign: 'left',
});
const NetworkCard: React.FunctionComponent<INetworkCardProps> = (props) => {
  const [networkInfo, setNetworkInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const isListening = await web3Instance().eth.net.isListening();
      const peerCount = await web3Instance().eth.net.getPeerCount();
      const networkType = await web3Instance().eth.net.getNetworkType();
      setNetworkInfo({ isListening, peerCount, networkType });
      setIsLoading(false);
    })();
  }, []);
  return (
    <GridBase
      title="Network"
      isLoading={isLoading}
      icon={<FontAwesomeIcon icon={'network-wired'} />}
    >
      <CenteredContainer>
        {networkInfo && (
          <List>
            <li>Listening: {networkInfo.isListening ? 'yes' : 'no'}</li>
            <li>Peer count: {networkInfo.peerCount}</li>
            <li>Network: {networkInfo.networkType}</li>
          </List>
        )}
      </CenteredContainer>
    </GridBase>
  );
};

export default NetworkCard;
