import * as React from 'react';
import {
  NavbarList,
  NavbarListItem,
  NavbarListItemLink,
  NavbarLogo,
  NavbarNav,
} from './Navbar.styled';
import ProofchainLogoFullLight from '@assets/svg/proofchain-logo-full-light.svg';
interface INavbarProps {}

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
  return (
    <NavbarNav>
      <NavbarLogo>
        <ProofchainLogoFullLight />
      </NavbarLogo>
      <NavbarList>
        <NavbarListItem>
          <NavbarListItemLink>Home</NavbarListItemLink>
        </NavbarListItem>
        <NavbarListItem>
          <NavbarListItemLink>Vision</NavbarListItemLink>
        </NavbarListItem>
        <NavbarListItem>
          <NavbarListItemLink>Technology</NavbarListItemLink>
        </NavbarListItem>
        <NavbarListItem>
          <NavbarListItemLink>Documentation</NavbarListItemLink>
        </NavbarListItem>
        <NavbarListItem>
          <NavbarListItemLink>Team</NavbarListItemLink>
        </NavbarListItem>
        <NavbarListItem>
          <NavbarListItemLink>Contact</NavbarListItemLink>
        </NavbarListItem>
      </NavbarList>
    </NavbarNav>
  );
};

export default Navbar;
