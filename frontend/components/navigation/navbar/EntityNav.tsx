import Address from '@components/Address';
import { EntityTypeEnum } from '@enums';
import { shortenAddress } from '@utils/eth';
import { Spinner } from 'baseui/spinner';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { State } from 'store';
import Navbar from './components/Navbar';
import NavDropdown from './components/NavDropdown';

const EntityNav = () => {
  const name = useSelector((state: State) => state.user.name);
  const balance = useSelector((state: State) => state.user.balance);
  const loadingBalance = useSelector(
    (state: State) => state.user.loadingBalance
  );
  const address = useSelector((state: State) => state.user.address);
  const items = {
    right: [
      {
        content: (
          <>
            <Address>{address}</Address> -{' '}
            {loadingBalance ? (
              <Spinner
                overrides={{
                  Svg: {
                    style: ({ $theme }) => ({
                      position: 'relative',
                      top: $theme.sizing.scale100,
                      left: $theme.sizing.scale200,
                    }),
                  },
                }}
                size={20}
              />
            ) : (
              balance + ' ETH'
            )}
          </>
        ),
      },
      {
        content: <NavDropdown>{name}</NavDropdown>,
      },
    ],
  };
  return <Navbar items={items} />;
};
export default EntityNav;
