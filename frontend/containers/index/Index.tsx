import React, { useState } from 'react';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import BatchesCard, {
  gridConfig as BatchesCardConfig,
} from './components/grid/BatchesCard';
import TransportsCard, {
  gridConfig as TransportsCardConfig,
} from './components/grid/TransportsCard';
import RawMaterialsCard, {
  gridConfig as RawMaterialsCardConfig,
} from './components/grid/RawMaterialsCard';
import MaterialsCard, {
  gridConfig as MaterialsCardConfig,
} from './components/grid/MaterialsCard';
import BalanceCard, {
  gridConfig as BalanceCardConfig,
} from './components/grid/BalanceCard';
import CompanyOverviewCard, {
  gridConfig as CompanyOverviewCardGridConfig,
} from './components/grid/CompanyOverviewCard';
import NetworkCard, {
  gridConfig as NetworkCardConfig,
} from './components/grid/NetworkCard';
const defaultLayouts = {
  lg: [
    CompanyOverviewCardGridConfig,
    BalanceCardConfig,
    MaterialsCardConfig,
    RawMaterialsCardConfig,
    BatchesCardConfig,
    TransportsCardConfig,
    NetworkCardConfig,
  ],
};

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('rgl-8')) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      'rgl-8',
      JSON.stringify({
        [key]: value,
      })
    );
  }
}

const Index = () => {
  const [layouts, setLayouts] = useState(getFromLS('layout') || defaultLayouts);

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
        onLayoutChange={(layout, layouts) => {
          saveToLS('layout', layouts);
          setLayouts(layouts);
        }}
      >
        <div key={CompanyOverviewCardGridConfig.i}>
          <CompanyOverviewCard />
        </div>
        <div key={BalanceCardConfig.i}>
          <BalanceCard />
        </div>
        <div key={MaterialsCardConfig.i}>
          <MaterialsCard />
        </div>
        <div key={RawMaterialsCardConfig.i}>
          <RawMaterialsCard />
        </div>
        <div key={BatchesCardConfig.i}>
          <BatchesCard />
        </div>
        <div key={TransportsCardConfig.i}>
          <TransportsCard />
        </div>
        <div key={NetworkCardConfig.i}>
          <NetworkCard />
        </div>
      </ResponsiveGridLayout>
    </>
  );
};
export default Index;
