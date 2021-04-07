import styled from 'styled-components';
import Container from '../layout/Container';

export const NavbarNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${({ theme }) => theme.sizing.scale2400};
  z-index: 2;
`;
export const NavbarContent = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;
export const NavbarList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: flex-end;
  flex: 2;
`;
export const NavbarListItem = styled.li``;
export const NavbarListItemLink = styled.a`
  text-decoration: none;
  display: inline-block;
  padding: ${({ theme }) => theme.sizing.scale300};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  text-transform: uppercase;
  &:hover {
    color: ${({ theme }) => theme.colors.gray['50']};
  }
`;
export const NavbarLogo = styled.span`
  flex: 1;
  & > svg {
    font-size: 18rem;

    height: 2rem;
  }
`;
