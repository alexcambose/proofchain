import ProofchainLogoFullLight from '@assets/svg/proofchain-logo-full-light.svg';
import * as React from 'react';
import Button from '@components/button/Button';
import {
  NavbarButtonContainer,
  NavbarContent,
  NavbarList,
  NavbarListItem,
  NavbarListItemLink,
  NavbarLogo,
  NavbarNav,
} from './Navbar.styled';
import { useEffect, useState } from 'react';
interface INavbarProps {}

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const scrollHandler = () => {
    if (scrollY > 50) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  };
  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);
  const onLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <NavbarNav collapsed={isCollapsed}>
      <NavbarContent>
        <NavbarLogo onClick={onLogoClick}>
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
            <NavbarButtonContainer>
              <Button>View Demo</Button>
            </NavbarButtonContainer>
          </NavbarListItem>
        </NavbarList>
      </NavbarContent>
    </NavbarNav>
  );
};

export default Navbar;
