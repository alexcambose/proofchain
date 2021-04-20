import {
  ORIENTATION,
  Tabs as BaseUiTabs,
  StatefulTabs,
  TabsProps,
  Tab,
} from 'baseui/tabs-motion';
import * as React from 'react';
import uuid from 'react-uuid';
interface ITabsProps {
  tabs: { title: string; content: React.ReactNode }[];
  orientation?: ORIENTATION[keyof ORIENTATION];
  renderAll?: boolean;
  [key: string]: any;
}

const Tabs: React.FunctionComponent<ITabsProps> = ({ tabs, ...props }) => {
  const [activeKey, setActiveKey] = React.useState(null);

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

export default React.memo(Tabs);
