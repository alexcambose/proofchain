import * as React from 'react';
import { Navigation } from 'baseui/side-navigation';

const CompanySidebar = () => {
  const [activeItemId, setActiveItemId] = React.useState('#primary');
  return (
    <Navigation
      items={[
        {
          title: 'Colors',
          itemId: '#colors',
          subNav: [
            { title: 'Primary', itemId: '#primary' },
            {
              title: 'Shades',
              itemId: '#shades',
              subNav: [
                { title: 'Dark', itemId: '#dark' },
                {
                  title: 'Disabled',
                  itemId: '#disabled',
                  disabled: true,
                },
              ],
            },
          ],
        },
      ]}
      activeItemId={activeItemId}
      mapItem={(e) => {
        if (e.itemId === '#shades') {
          e.subNav = [];
        }
        return e;
      }}
      onChange={({ item }) => setActiveItemId(item.itemId)}
    />
  );
};
export default CompanySidebar;
