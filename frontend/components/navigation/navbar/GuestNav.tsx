import { shortenAddress } from '@utils/eth';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { State } from 'store';
import Navbar from './components/Navbar';
import NavDropdown from './components/NavDropdown';
const GuestNav = () => {
  const address = useSelector((state: State) => state.user.address);
  const items = {
    right: [
      {
        content: <NavDropdown>{shortenAddress(address)}</NavDropdown>,
      },
    ],
  };
  return <Navbar items={items} />;
};
export default GuestNav;
