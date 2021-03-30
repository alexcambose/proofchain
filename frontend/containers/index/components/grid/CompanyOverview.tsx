import { State } from '@store/index';
import { Display2 } from 'baseui/typography';
import * as React from 'react';
import { useSelector } from 'react-redux';
import GridBase from './GridBase';

interface ICompanyOverviewProps {}

const CompanyOverview: React.FunctionComponent<ICompanyOverviewProps> = (
  props
) => {
  const user = useSelector((state: State) => state.user);
  console.log(user);
  return (
    <GridBase>
      <Display2>{user.name}</Display2>
    </GridBase>
  );
};

export default CompanyOverview;
