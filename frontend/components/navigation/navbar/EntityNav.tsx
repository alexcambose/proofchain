import Address from '@components/Address';
import { EntityTypeEnum } from '@enums';
import { refreshBalance } from '@store/user/actions';
import { shortenAddress } from '@utils/eth';
import { useStyletron } from 'baseui';
import { SIZE, StyledSpinnerNext as Spinner } from 'baseui/spinner';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from 'store';
import Navbar from './components/Navbar';
import NavDropdown from './components/NavDropdown';

const EntityNav = () => {
  const [css, theme] = useStyletron();
  const dispatch = useDispatch();
  const name = useSelector((state: State) => state.user.name);
  const balance = useSelector((state: State) => state.user.balance);
  const loadingBalance = useSelector(
    (state: State) => state.user.loadingBalance
  );
  const address = useSelector((state: State) => state.user.address);
  const onBalanceClick = () => {
    dispatch(refreshBalance());
  };
  const items = {
    right: [
      {
        content: (
          <>
            <Address>{address}</Address> -{' '}
            <span style={{ cursor: 'pointer' }} onClick={onBalanceClick}>
              {loadingBalance ? (
                <Spinner
                  $size={SIZE.small}
                  $as="span"
                  $style={{
                    display: 'inline-block',
                    position: 'relative',

                    top: theme.sizing.scale100,
                    left: theme.sizing.scale200,
                    width: theme.sizing.scale500,
                    height: theme.sizing.scale500,
                  }}
                />
              ) : (
                balance + ' ETH'
              )}
            </span>
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
