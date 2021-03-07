import * as React from 'react';
import Navbar from './components/Navbar';
const GuestNav = () => {
  const items = {
    left: [
      {
        content: 'aa',
      },
    ],
  };
  return <Navbar items={items} />;
};
export default GuestNav;
