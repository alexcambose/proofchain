import CompanyEntityTypeTag from '@components/tag/CompanyEntityTypeTag';
import { CompanyEntityTypeEnum, EntityTypeEnum } from '@enums';
import { State } from '@store/index';
import { IUser } from '@store/user/interface';
import { styled, useStyletron } from 'baseui';
import { Display4, Label3 } from 'baseui/typography';
import * as React from 'react';
import { useSelector } from 'react-redux';
import GridBase, { shouldBeDisabled } from './GridBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingSkeleton from '@components/loading/LoadingSkeleton';

interface ICompanyOverviewCardProps {}
export const gridConfig = {
  i: 'CompanyOverviewCard',
  lg: {
    i: 'CompanyOverviewCard',

    x: 0,
    y: 2,
    w: 4,
    h: 6,
    minW: 4,
    minH: 5,
  },
  md: {
    i: 'CompanyOverviewCard',

    x: 1,
    y: 2,
    w: 4,
    h: 6,
    minW: 4,
    minH: 5,
  },
};
const CompanyHeader = styled('div', ({ $theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  width: '100%',
}));
const CompanyHeaderIcon = styled('div', ({ $theme }) => ({
  marginRight: $theme.sizing.scale300,
}));
const CompanyHeaderDetails = styled('div', ({ $theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: $theme.sizing.scale300,
}));
const AddressContainer = styled('div', ({ $theme }) => ({
  padding: $theme.sizing.scale400,
  textAlign: 'center',
  background: $theme.colors.mono200,
  width: '100%',
  ...$theme.typography.LabelSmall,
}));
const CenteredContainer = styled('div', ({ $theme }) => ({
  flex: 1,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));
const headerLabel = (user: IUser) => {
  if (user.entityType === EntityTypeEnum.CERTIFICATE_AUTHORITY) {
    return 'Certificate authority';
  } else {
    return 'Company';
  }
};
const CompanyOverviewCard: React.FunctionComponent<ICompanyOverviewCardProps> = (
  props
) => {
  const user = useSelector((state: State) => state.user);

  const [css, theme] = useStyletron();
  if (!user.address) return <LoadingSkeleton />;
  return (
    <GridBase title="About you">
      <CompanyHeader>
        <CompanyHeaderIcon>
          <FontAwesomeIcon
            className={css({
              color: theme.colors.contentInverseTertiary,
              ...theme.typography.DisplaySmall,
            })}
            icon="building"
          />
        </CompanyHeaderIcon>
        <CompanyHeaderDetails>
          <Display4>{user.name}</Display4>
          <Label3
            className={css({
              color: theme.colors.contentInverseTertiary,
            })}
          >
            {headerLabel(user)}
          </Label3>
        </CompanyHeaderDetails>
      </CompanyHeader>

      <CenteredContainer>
        <AddressContainer>{user.address}</AddressContainer>

        <CompanyEntityTypeTag entityType={user.companyEntityType} />
      </CenteredContainer>
    </GridBase>
  );
};

export default CompanyOverviewCard;
