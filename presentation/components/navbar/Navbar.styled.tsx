import styled, { css } from 'styled-components';
import Container from '../layout/Container';

export const NavbarNav = styled.nav`
  position: fixed;
  border-bottom: 1px solid rgba(255, 255, 255, 0);

  top: 0;
  left: 0;
  right: 0;
  height: ${({ theme }) => theme.sizing.scale2400};
  z-index: 2;
  transition: ${({ theme }) => theme.animation.standard};
  ${({ theme, collapsed }) =>
    collapsed &&
    css`
      height: ${theme.sizing.scale1600};
      background-color:rgba(0,0,0,.4);
      backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

    }`}
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
export const NavbarListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;
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
  cursor: pointer;
  flex: 1;
  & > svg {
    font-size: 18rem;

    height: 2rem;
  }
`;
export const NavbarButtonContainer = styled.div`
  margin-left: ${({ theme }) => theme.sizing.scale300};
`;
