import ProofchainLogoFullLight from '@assets/svg/proofchain-logo-full-light.svg';
import * as React from 'react';
import Button from '@components/button/Button';
import {
  NavbarContent,
  NavbarList,
  NavbarListItem,
  NavbarListItemLink,
  NavbarLogo,
  NavbarNav,
} from './Navbar.styled';
interface INavbarProps {}

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
  return (
    <NavbarNav>
      <NavbarContent>
        <NavbarLogo>
          <ProofchainLogoFullLight />
        </NavbarLogo>
        <NavbarList>
          <NavbarListItem>
            <NavbarListItemLink href="#home">Home</NavbarListItemLink>
          </NavbarListItem>
          <NavbarListItem>
            <NavbarListItemLink href="#vision">Vision</NavbarListItemLink>
          </NavbarListItem>
          <NavbarListItem>
            <NavbarListItemLink href="#technology">
              Technology
            </NavbarListItemLink>
          </NavbarListItem>
          <NavbarListItem>
            <NavbarListItemLink href="#documentation">
              Documentation
            </NavbarListItemLink>
          </NavbarListItem>
          <NavbarListItem>
            <NavbarListItemLink href="#team">Team</NavbarListItemLink>
          </NavbarListItem>
          <NavbarListItem>
            <NavbarListItemLink href="#contact">Contact</NavbarListItemLink>
          </NavbarListItem>
          <NavbarListItem>
            <Button>View Demo</Button>
          </NavbarListItem>
        </NavbarList>
      </NavbarContent>
    </NavbarNav>
  );
};

export default Navbar;
