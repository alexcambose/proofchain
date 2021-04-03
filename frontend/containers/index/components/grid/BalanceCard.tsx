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
  x: 8,
  y: 0,
  w: 2,
  h: 4,
  minW: 2,
  minH: 4,
};
const LastRefresh = styled(Paragraph4, ({ $theme }) => ({
  marginTop: $theme.sizing.scale100,
  color: $theme.colors.contentTertiary,
  ...$theme.typography.ParagraphXSmall,
  fontSize: '10px',
}));
const BalanceCard: React.FunctionComponent<IBalanceCardProps> = (props) => {
  const user = useSelector((state: State) => state.user);
  return (
    <GridBase
      title="Balance"
      icon={<FontAwesomeIcon icon={['fab', 'ethereum']} />}
    >
      <CenteredContainer>
        {user.balance} ETH
        <LastRefresh>
          Updated <TimeIndicator>{user.lastBalanceRefresh}</TimeIndicator>
        </LastRefresh>
      </CenteredContainer>
    </GridBase>
  );
};

export default BalanceCard;
