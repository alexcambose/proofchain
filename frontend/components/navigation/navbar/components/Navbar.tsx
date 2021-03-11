import * as React from 'react';
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from 'baseui/header-navigation';
import { StyledLink } from 'baseui/link';
import { Button } from 'baseui/button';
import uuid from 'react-uuid';

interface ItemsInterface {
  content: any;
}
interface ItemsGroupInterface {
  left?: ItemsInterface[];
  center?: ItemsInterface[];
  right?: ItemsInterface[];
}
interface NavbarProps {
  items: ItemsGroupInterface;
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {
  return (
    <HeaderNavigation
      overrides={{
        Root: {
          style: ({ $theme }) => ({
            marginBottom: $theme.sizing.scale400,
          }),
        },
      }}
    >
      {['left', 'center', 'right'].map((alignment) => (
        <StyledNavigationList key={uuid()} $align={ALIGN[alignment]}>
          {(items[alignment] || []).map((item) => (
            <StyledNavigationItem key={uuid()}>
              {item.content}
            </StyledNavigationItem>
          ))}
        </StyledNavigationList>
      ))}
    </HeaderNavigation>
  );
};
export default Navbar;
