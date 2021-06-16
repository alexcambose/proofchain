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
  NavbarToggle,
} from './Navbar.styled';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import config from 'config';
interface INavbarProps {}

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const scrollHandler = () => {
    if (scrollY > 50) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  };
  useEffect(() => {
    setIsCollapsed(true);
    setTimeout(() => {
      setIsCollapsed(false);
    }, 500);
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
        <NavbarList isVisible={isVisible}>
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
              <a href={config.demoLink} target="_blank">
                <Button>View Demo</Button>
              </a>
            </NavbarButtonContainer>
          </NavbarListItem>
        </NavbarList>
        <NavbarToggle>
          <FontAwesomeIcon
            icon="bars"
            onClick={() => setIsVisible((v) => !v)}
          />
        </NavbarToggle>
      </NavbarContent>
    </NavbarNav>
  );
};

export default Navbar;
