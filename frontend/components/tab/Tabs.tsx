import { ORIENTATION, StatefulTabs, TabsProps, Tab } from 'baseui/tabs-motion';
import * as React from 'react';
import uuid from 'react-uuid';
interface ITabsProps {
  tabs: { title: string; content: React.ReactNode }[];
  orientation?: ORIENTATION[keyof ORIENTATION];
  renderAll?: boolean;
}

const Tabs: React.FunctionComponent<ITabsProps> = ({ tabs, ...props }) => {
  return (
    <StatefulTabs
      overrides={{
        Root: {
          style: ({ $theme }) => ({
            overflowX: 'auto',
          }),
        },
        TabList: {
          style: ({ $theme }) => ({
            minWidth: '170px',
          }),
        },
      }}
      {...props}
    >
      {tabs.map((e) => (
        <Tab key={uuid()} title={e.title}>
          {e.content}
        </Tab>
      ))}
    </StatefulTabs>
  );
};

export default Tabs;