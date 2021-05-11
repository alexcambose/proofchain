import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from 'baseui';

export const SideNavigationContainer = styled('div', ({ $theme }) => ({
  width: '100%',
  minWidth: '200px',
  background: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'space-between',
  justifyContent: 'space-between',
  paddingTop: '40px',

  [$theme.mediaQuery.large]: {
    paddingTop: '80px',

    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: 'inherit',
  },
  ...$theme.typography.LabelMedium,
  boxShadow: $theme.lighting.shadow500,
  color: $theme.colors.contentPrimary,
  paddingBottom: $theme.sizing.scale700,
}));
export const SideNavigationSectionContainer = styled(
  'div',
  ({ $theme }) => ({})
);
export const SideNavigationSection = styled('div', ({ $theme, $isBottom }) => ({
  paddingLeft: $theme.sizing.scale600,
  paddingRight: $theme.sizing.scale600,
  marginTop: $isBottom && 'auto',
}));
export const SideNavigationSectionMainTitle = styled('div', ({ $theme }) => ({
  color: $theme.colors.accent,
  userSelect: 'none',
}));
export const SideNavigationSectionTitle = styled(
  'div',
  ({ $theme, $opened, $hasChildren }) => ({
    paddingLeft: $theme.sizing.scale500,
    paddingRight: $theme.sizing.scale500,
    paddingTop: $theme.sizing.scale500,
    paddingBottom: $theme.sizing.scale500,
    cursor: 'pointer',
    userSelect: 'none',
    transition: $theme.animation.timing200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: $opened && !$hasChildren ? `rgba(39, 110, 241, 0.2)` : 'auto',

    [':hover']: {
      background: $opened ? `rgba(39, 110, 241, 0.15)` : `rgba(0, 0, 0, 0.05)`,
    },
  })
);
export const SideNavigationSectionTitleIcon = styled(
  FontAwesomeIcon,
  ({ $theme }) => ({
    marginRight: $theme.sizing.scale400,
    fontSize: '105%',
    color: $theme.colors.contentSecondary,
  })
);

export const SideNavigationSectionList = styled(
  'ul',
  ({ $theme, $opened }) => ({
    position: 'relative',
    listStyleType: 'none',
    paddingLeft: $theme.sizing.scale900,
    margin: 0,
    maxHeight: $opened ? '300px' : 0,
    overflow: 'hidden',
    transition: 'all .3s ease ',
    color: $theme.colors.contentSecondary,
  })
);
export const SideNavigationSectionLine = styled('div', ({ $theme }) => ({
  position: 'absolute',
  content: ' ',
  top: $theme.sizing.scale100,
  bottom: $theme.sizing.scale100,
  left: $theme.sizing.scale600,
  width: $theme.sizing.scale0,
  background: $theme.colors.accent,
  opacity: 0.3,
}));

export const SideNavigationSectionListItem = styled(
  'li',
  ({ $theme, $isActive }) => ({
    transition: 'all .3s ease ',
    paddingLeft: $theme.sizing.scale400,
    paddingRight: $theme.sizing.scale400,
    paddingTop: $theme.sizing.scale500,
    paddingBottom: $theme.sizing.scale500,
    cursor: 'pointer',
    userSelect: 'none',
    color: $isActive ? 'black' : 'inherit',
    fontWeight: $isActive ? 'bold' : 'normal',
    background: $isActive ? `rgba(39, 110, 241, 0.2)` : 'auto',
    [':hover']: {
      background: $isActive
        ? `rgba(39, 110, 241, 0.15)`
        : `rgba(0, 0, 0, 0.05)`,
    },
  })
);
export const SideNavigationSectionListItemLink = styled(
  'div',
  ({ $theme }) => ({
    userSelect: 'none',
  })
);
export const SideNavigationCaret = styled('span', ({ $theme, $opened }) => ({
  transform: $opened ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: '.3s',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: $opened ? 0.8 : 0.5,
}));
