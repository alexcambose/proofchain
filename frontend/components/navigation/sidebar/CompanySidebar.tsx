import * as React from 'react';
import { Navigation } from 'baseui/side-navigation';
import { useRouter } from 'next/router';

const CompanySidebar = () => {
  const router = useRouter();
  const [activeItemId, setActiveItemId] = React.useState('#all-materials');
  const onNavigationChange = ({ event, item }) => {
    setActiveItemId(item.itemId);
    // prevent page reload
    event.preventDefault();
    router.push(item.itemId);
  };
  return (
    <Navigation
      items={[
        {
          title: 'Materials',
          itemId: '/materials',
          subNav: [
            { title: 'All materials', itemId: '/materials' },
            {
              title: 'Create material',
              itemId: '/materials/create',
            },
          ],
        },
        {
          title: 'Raw materials',
          itemId: '#raw-materials',
          subNav: [
            { title: 'All raw materials', itemId: '#all-raw-materials' },
            {
              title: 'Create raw material',
              itemId: '#create-raw-material',
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
      onChange={onNavigationChange}
    />
  );
};
export default CompanySidebar;
