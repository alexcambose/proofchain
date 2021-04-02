import React from 'react';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import BalanceCard, {
  gridConfig as BalanceCardConfig,
} from './components/grid/BalanceCard';
import CompanyOverviewCard, {
  gridConfig as CompanyOverviewCardGridConfig,
} from './components/grid/CompanyOverviewCard';
const layouts = {
  lg: [CompanyOverviewCardGridConfig, BalanceCardConfig],
};
const Index = () => {
  return (
    <>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        width={1200}
        items={20}
        rowHeight={30}
      >
        <div key={CompanyOverviewCardGridConfig.i}>
          <CompanyOverviewCard />
        </div>
        <div key={BalanceCardConfig.i}>
          <BalanceCard />
        </div>
      </ResponsiveGridLayout>
    </>
  );
};
export default Index;
