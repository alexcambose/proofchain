import * as React from 'react';
import { AppNavBar, setItemActive } from 'baseui/app-nav-bar';
import { ChevronDown, Delete, Overflow, Upload } from 'baseui/icon';
import web3Instance from 'web3';
import { useSelector } from 'react-redux';
import { State } from 'store';
import { shortenAddress } from '@utils/eth';

const GuestNav: React.FC = () => {
  const user = useSelector((state: State) => state.user);
  const [mainItems, setMainItems] = React.useState([
    { icon: Upload, label: 'Main A' },
    {
      active: true,
      icon: ChevronDown,
      label: 'Main B',
      navExitIcon: Delete,
      children: [
        { icon: Upload, label: 'Secondary A' },
        { icon: Upload, label: 'Secondary B' },
      ],
    },
  ]);
  console.log(user);
  return (
    <AppNavBar
      title="Title"
      mainItems={mainItems}
      // onMainItemSelect={(item) => {
      //   setMainItems((prev) => setItemActive(prev, item));
      // }}
      // username={shortenAddress(user.address)}
      usernameSubtitle="5 Stars"
      userItems={[
        { icon: Overflow, label: 'User A' },
        { icon: Overflow, label: 'User B' },
      ]}
      onUserItemSelect={(item) => console.log(item)}
    />
  );
};

export default GuestNav;
