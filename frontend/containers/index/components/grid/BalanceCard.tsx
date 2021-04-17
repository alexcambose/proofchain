import CenteredContainer from '@components/layout/CenteredContainer';
import TimeIndicator from '@components/TimeIndicator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { State } from '@store/index';
import { styled } from 'baseui';
import { Paragraph4 } from 'baseui/typography';
import * as React from 'react';
import { useSelector } from 'react-redux';
import GridBase from './GridBase';

interface IBalanceCardProps {}
export const gridConfig = {
  i: 'Balance Card',
  lg: {
    i: 'Balance Card',

    x: 8,
    y: 0,
    w: 2,
    h: 4,
    minW: 2,
    minH: 4,
  },
  md: {
    i: 'Balance Card',

    x: 8,
    y: 0,
    w: 2,
    h: 4,
    minW: 2,
    minH: 4,
  },
};
const LastRefresh = styled(Paragraph4, ({ $theme }) => ({
  marginTop: $theme.sizing.scale100,
  color: $theme.colors.contentTertiary,
  ...$theme.typography.ParagraphXSmall,
  fontSize: '10px',
}));
const BalanceCard: React.FunctionComponent<IBalanceCardProps> = (props) => {
  const [balance, lastBalanceRefresh] = useSelector((state: State) => [
    state.user.balance,
    state.user.lastBalanceRefresh,
  ]);
  return (
    <GridBase
      title="Balance"
      icon={<FontAwesomeIcon icon={['fab', 'ethereum']} />}
    >
      <CenteredContainer>
        {balance} ETH
        <LastRefresh>
          Updated <TimeIndicator>{Number(lastBalanceRefresh)}</TimeIndicator>
        </LastRefresh>
      </CenteredContainer>
    </GridBase>
  );
};

export default BalanceCard;
