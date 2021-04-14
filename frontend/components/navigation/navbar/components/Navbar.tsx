import Logo from '@assets/images/logo/proofchain-logo-full-dark.svg';
import { Block } from 'baseui/block';
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
    <>
      <Block $style={{ height: '80px' }} />
      <HeaderNavigation
        overrides={{
          Root: {
            style: ({ $theme }) => ({
              marginBottom: $theme.sizing.scale400,
              border: 'none',
              boxShadow: $theme.lighting.shadow500,
              position: 'fixed',
              left: 0,
              right: 0,
              top: 0,
              zIndex: 99,
              backgroundColor: $theme.colors.primaryB,
            }),
          },
        }}
      >
        <StyledNavigationList $align={ALIGN.left}>
          <StyledNavigationItem>
            <Logo style={{ width: '11em' }} />
          </StyledNavigationItem>
        </StyledNavigationList>
        {['left', 'center', 'right'].map((alignment) => (
          <StyledNavigationList key={uuid()} $align={ALIGN[alignment]}>
            {(items[alignment] || []).map((item: { content: any }) => (
              <StyledNavigationItem key={uuid()}>
                {item.content}
              </StyledNavigationItem>
            ))}
          </StyledNavigationList>
        ))}
      </HeaderNavigation>
    </>
  );
};
export default Navbar;
