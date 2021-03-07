import * as React from 'react';
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from 'baseui/header-navigation';
import { StyledLink } from 'baseui/link';
import { Button } from 'baseui/button';

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
    <HeaderNavigation>
      {['left', 'center', 'right'].map((alignment) => (
        <StyledNavigationList $align={ALIGN[alignment]}>
          <StyledNavigationItem>
            {(items[alignment] || []).map((item) => (
              <StyledNavigationItem>{item.content}</StyledNavigationItem>
            ))}
          </StyledNavigationItem>
        </StyledNavigationList>
      ))}
    </HeaderNavigation>
  );
};
export default Navbar;
