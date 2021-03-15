import Logo from '@assets/images/logo/logo-full-dark.svg';
import {
  ALIGN,
  HeaderNavigation,
  StyledNavigationItem,
  StyledNavigationList,
} from 'baseui/header-navigation';
import * as React from 'react';
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
      <StyledNavigationList $align={ALIGN.left}>
        <StyledNavigationItem>
          <Logo style={{ width: '7em' }} />
        </StyledNavigationItem>
      </StyledNavigationList>
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
