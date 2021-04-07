import styled from 'styled-components';

export const NavbarNav = styled.nav`
  position: absolute;
`;
export const NavbarList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;
export const NavbarListItem = styled.li``;
export const NavbarListItemLink = styled.li`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.white};
`;
export const NavbarLogo = styled.span``;
