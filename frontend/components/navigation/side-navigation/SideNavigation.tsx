import ChevronDown from 'baseui/icon/chevron-down';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  SideNavigationCaret,
  SideNavigationContainer,
  SideNavigationSection,
  SideNavigationSectionContainer,
  SideNavigationSectionLine,
  SideNavigationSectionList,
  SideNavigationSectionListItem,
  SideNavigationSectionListItemLink,
  SideNavigationSectionMainTitle,
  SideNavigationSectionTitle,
  SideNavigationSectionTitleIcon,
} from './SideNavigation.styled';

interface ISideNaviagtionItem {
  title: any;
  itemId: string;
  icon?: any;
  sectionTitle?: string;
  subNav?: ISideNaviagtionItem[];
}

interface ISideNavigationProps {
  items: ISideNaviagtionItem[];
  bottomItems: ISideNaviagtionItem[];
  activeItemId: string;
}

const SideNavigation: React.FunctionComponent<ISideNavigationProps> = ({
  items,
  activeItemId,
  bottomItems,
}) => {
  const [status, setStatus] = useState({});
  const router = useRouter();
  const onItemClick = (location) => {
    router.push(location);
  };
  useEffect(() => {
    if (activeItemId) {
      setStatus({ [activeItemId]: true });
    }
  }, [activeItemId]);
  console.log(activeItemId);
  const renderItems = (items, ...props) => (
    <SideNavigationSectionContainer>
      {items.map((item) => (
        <SideNavigationSection {...props}>
          <SideNavigationSectionMainTitle>
            {item.sectionTitle}
          </SideNavigationSectionMainTitle>
          <SideNavigationSectionTitle
            onClick={() =>
              !item.subNav
                ? onItemClick(item.itemId)
                : setStatus((s) => ({ ...s, [item.itemId]: !s[item.itemId] }))
            }
            $opened={status[item.itemId]}
            $hasChildren={item.subNav}
          >
            <span>
              <SideNavigationSectionTitleIcon icon={item.icon} />
              {item.title}
            </span>
            {item.subNav && (
              <SideNavigationCaret
                $opened={
                  status[item.itemId] ||
                  activeItemId.indexOf(item.itemId) !== -1
                }
              >
                <ChevronDown />
              </SideNavigationCaret>
            )}
          </SideNavigationSectionTitle>
          <SideNavigationSectionList
            $opened={
              status[item.itemId] || activeItemId.indexOf(item.itemId) !== -1
            }
          >
            {/* {item.itemId} */}
            <SideNavigationSectionLine />

            {item.subNav &&
              item.subNav.map((subNavItem) => (
                <SideNavigationSectionListItem
                  $isActive={activeItemId === subNavItem.itemId}
                >
                  <SideNavigationSectionListItemLink
                    onClick={() => onItemClick(subNavItem.itemId)}
                  >
                    {subNavItem.title}
                  </SideNavigationSectionListItemLink>
                </SideNavigationSectionListItem>
              ))}
          </SideNavigationSectionList>
        </SideNavigationSection>
      ))}
    </SideNavigationSectionContainer>
  );

  return (
    <SideNavigationContainer>
      {renderItems(items)} {renderItems(bottomItems, { $isBottom: true })}
    </SideNavigationContainer>
  );
};

export default SideNavigation;
