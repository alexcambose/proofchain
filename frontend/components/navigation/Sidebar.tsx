import * as React from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { State } from '@store/index';
import { StatefulTextarea } from 'baseui/textarea';
import { CompanyEntityTypeEnum, EntityTypeEnum } from '@enums';
import SideNavigation from './side-navigation/SideNavigation';
const companyItems = [
  {
    title: 'Materials',
    itemId: '/material',
    icon: 'draw-polygon',
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
    icon: 'dot-circle',

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
    icon: 'boxes',
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
    icon: 'truck',
    subNav: [
      { title: 'All transports', itemId: '/transport' },
      {
        title: 'Create transport',
        itemId: '/transport/create',
      },
    ],
  },
  {
    title: 'Certificates',
    itemId: '/certificate',
    icon: 'scroll',
  },
];
const certificateAuthorityItems = [
  {
    title: 'Certificates',
    itemId: '/certificate',
    subNav: [
      { title: 'All certificates', itemId: '/certificate' },
      {
        title: 'Create certificate',
        itemId: '/certificate/create',
      },
      {
        title: 'Assign certificate',
        itemId: '/certificate/assign',
      },
    ],
  },
];
const logisticEntityMenus = [
  {
    title: 'Transports',
    itemId: '/transport',
    subNav: [
      { title: 'All transports', itemId: '/transport' },
      // { title: 'Transport requests', itemId: '/transport/requests' },
    ],
  },
];
const CompanySidebar = () => {
  const router = useRouter();
  const entityType = useSelector((state: State) => state.user.entityType);
  const companyEntityType = useSelector(
    (state: State) => state.user.companyEntityType
  );
  return (
    <SideNavigation
      bottomItems={[
        {
          title: 'Github',
          icon: ['fab', 'github'],
        },
      ]}
      items={[
        {
          title: <>Dashboard</>,
          icon: 'home',
          itemId: '/',
        },
        ...(entityType === EntityTypeEnum.CERTIFICATE_AUTHORITY
          ? certificateAuthorityItems
          : companyEntityType === CompanyEntityTypeEnum.LOGISTIC
          ? logisticEntityMenus
          : companyItems),
      ]}
      activeItemId={router.route}
    />
  );
};
export default CompanySidebar;
