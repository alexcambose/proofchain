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

interface IBalanceCardProps {}
export const gridConfig = {
  i: 'Balance Card',
  x: 4,
  y: 0,
  w: 2,
  h: 4,
  // minW: 2,
  // minH: 4,
};
const BalanceContainer = styled('div', ({ $theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
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
      <BalanceContainer>
        <CenteredContainer>
          {user.balance} ETH
          <LastRefresh>
            Updated <TimeIndicator>{user.lastBalanceRefresh}</TimeIndicator>
          </LastRefresh>
        </CenteredContainer>
      </BalanceContainer>
    </GridBase>
  );
};

export default BalanceCard;
