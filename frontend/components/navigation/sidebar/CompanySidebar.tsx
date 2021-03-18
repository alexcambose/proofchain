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
          itemId: '/material',
          subNav: [
            { title: 'All materials', itemId: '/material' },
            {
              title: 'Create material',
              itemId: '/material/create',
            },
          ],
        },
        {
          title: 'Raw materials',
          itemId: '/raw-material',
          subNav: [
            { title: 'All raw materials', itemId: '/raw-material' },
            {
              title: 'Create raw material',
              itemId: '/raw-material/create',
            },
          ],
        },
        {
          title: 'Batches',
          itemId: '/batch',
          subNav: [
            { title: 'All batches', itemId: '/batch' },
            {
              title: 'Create batch',
              itemId: '/batch/create',
            },
          ],
        },
        {
          title: 'Transports',
          itemId: '/transport',
          subNav: [
            { title: 'All transports', itemId: '/transport' },
            {
              title: 'Create transport',
              itemId: '/transport/create',
            },
          ],
        },
      ]}
      activeItemId={activeItemId}
      mapItem={(e) => {
        // if (e.itemId === '#shades') {
        //   e.subNav = [];
        // }
        return e;
      }}
      onChange={onNavigationChange}
    />
  );
};
export default CompanySidebar;
