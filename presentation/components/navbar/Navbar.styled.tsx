import styled, { css } from 'styled-components';
import Container from '../layout/Container';
const backdropBackground = css`
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: saturate(180%) blur(20px);
`;
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
    theme.media.lg(css`
      height: ${({ theme }) => theme.sizing.scale3200};
    `)}

  ${({ theme, collapsed }) =>
    collapsed &&
    css`
      height: ${theme.sizing.scale1600};
       background-color: rgba(0, 0, 0, 0.4);
      backdrop-filter: saturate(180%) blur(20px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    
    }`}
`;
export const NavbarContent = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  ${({ theme }) =>
    theme.media.lg(css`
      align-items: center;
      overflow: hidden;
      margin: 0 !important;
    `)}
`;
export const NavbarList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: flex-end;
  flex: 2;
  ${({ isVisible, theme }) =>
    theme.media.lg(`
      visibility: ${isVisible ? 'visible' : 'hidden'};
    `)}
  ${({ theme, isVisible }) =>
    theme.media.lg(css`
      width: 100%;
      align-items: flex-start;
      flex-direction: column;
      position: absolute;
      top: 100%;
      background-color: rgba(0, 0, 0, 0.9);
      z-index: -1;
      padding: 20px;
    `)}
`;
export const NavbarListItem = styled.li`
  display: flex;
  align-items: center;

  ${({ theme }) =>
    theme.media.lg(css`
      width: 100%;
      justify-content: center;
      text-align: center;
    `)}
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
  ${({ theme }) =>
    theme.media.lg(css`
      width: 100%;
    `)}
`;
export const NavbarLogo = styled.span`
  cursor: pointer;
  flex: 1;
  ${({ theme }) =>
    theme.media.lg(css`
      margin-left: 20px;
    `)}
  & > svg {
    font-size: 18rem;

    height: 2rem;
  }
`;
export const NavbarButtonContainer = styled.div`
  margin-left: ${({ theme }) => theme.sizing.scale300};
`;
export const NavbarToggle = styled.div`
  display: none;
  font-size: 2rem;
  margin-right: ${({ theme }) => theme.sizing.scale600};
  ${({ theme }) =>
    theme.media.lg(css`
      display: inline-block;
    `)}
`;
