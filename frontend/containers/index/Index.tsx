import React from 'react';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import CompanyOverview from './components/grid/CompanyOverview';
const layouts = {
  lg: [{ i: '1', x: 4, y: 2, w: 2, h: 2 }],
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
        <div key="1">
          <CompanyOverview />
        </div>
      </ResponsiveGridLayout>
    </>
  );
};
export default Index;
