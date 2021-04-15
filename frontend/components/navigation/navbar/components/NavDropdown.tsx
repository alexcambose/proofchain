import { StatefulMenu } from 'baseui/menu';
import { PLACEMENT, StatefulPopover } from 'baseui/popover';
import * as React from 'react';
import ChevronDown from 'baseui/icon/chevron-down';
import ChevronUp from 'baseui/icon/chevron-up';
import { styled } from 'baseui';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '@store/user/index';
interface INavDropdownProps {
  avatarUrl?: string;
  children?: React.ReactNode;
}

const DropdownHeader = styled('div', () => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  userSelect: 'none',
}));

const NavDropdown: React.FunctionComponent<INavDropdownProps> = ({
  avatarUrl,
  children,
}) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const dispatch = useDispatch();

  const items = [
    {
      id: 1,
      label: 'Logout',
    },
  ];
  const onItemSelect = (item, close) => {
    if (item.id === 1) {
      dispatch(logout());
    }
    close();
  };
  return (
    <StatefulPopover
      overrides={{
        Body: {
          style: ({ $theme }) => ({
            zIndex: 2,
          }),
        },
      }}
      content={({ close }) => (
        <StatefulMenu
          overrides={{
            List: {
              style: ({ $theme }) => ({ minWidth: '8vw' }),
            },
            Option: {
              props: {
                overrides: {
                  ListItem: {
                    style: ({ $theme }) => ({
                      height: $theme.sizing.scale8000,
                      display: 'flex',
                      alignItems: 'center',
                    }),
                  },
                },
              },
            },
          }}
          onItemSelect={({ item }) => onItemSelect(item, close)}
          items={items}
        />
      )}
      placement={PLACEMENT.bottom}
      returnFocus={false}
      onOpen={() => setIsOpened(true)}
      onClose={() => setIsOpened(false)}
      autoFocus
    >
      <DropdownHeader>
        {avatarUrl ? null : children}
        {isOpened ? <ChevronUp size={30} /> : <ChevronDown size={30} />}
      </DropdownHeader>
    </StatefulPopover>
  );
};

export default NavDropdown;
