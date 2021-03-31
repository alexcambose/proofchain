import CenteredContainer from '@components/layout/CenteredContainer';
import CompanyEntityTypeTag from '@components/tag/CompanyEntityTypeTag';
import { CompanyEntityTypeEnum, EntityTypeEnum } from '@enums';
import { State } from '@store/index';
import { IUser } from '@store/user/interface';
import { styled, useStyletron } from 'baseui';
import { Display4, Label3 } from 'baseui/typography';
import * as React from 'react';
import { useSelector } from 'react-redux';
import GridBase from './GridBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingSkeleton from '@components/loading/LoadingSkeleton';

interface ICompanyOverviewProps {}
export const gridConfig = {
  i: 'companyOverview',
  x: 0,
  y: 0,
  w: 4,
  h: 6,
  minW: 4,
  minH: 5,
};
const CompanyHeader = styled('div', ({ $theme }) => ({
  display: 'flex',
  alignItems: 'center',
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
  alignText: 'center',
  background: $theme.colors.mono200,
}));
const headerLabel = (user: IUser) => {
  if (user.entityType === EntityTypeEnum.CERTIFICATE_AUTHORITY) {
    return 'Certificate authority';
  } else {
    return 'Company';
  }
};
const CompanyOverview: React.FunctionComponent<ICompanyOverviewProps> = (
  props
) => {
  const [css, theme] = useStyletron();
  const user = useSelector((state: State) => state.user);
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
        <AddressContainer>
          <Label3>{user.address}</Label3>
        </AddressContainer>

        <CompanyEntityTypeTag entityType={user.companyEntityType} />
      </CenteredContainer>
    </GridBase>
  );
};

export default CompanyOverview;
