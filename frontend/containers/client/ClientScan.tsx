import * as React from 'react';
import { useState } from 'react';
import Scan from './components/Scan';
import { Drawer, SIZE, ANCHOR } from 'baseui/drawer';
import { FILL, Tab } from 'baseui/tabs-motion';
import { Button } from 'baseui/button';
import ProductCodeForm from './components/form/ProductCodeForm';
import Tabs from '@components/tab/Tabs';

interface IClientScanProps {}

const ClientScan: React.FunctionComponent<IClientScanProps> = (props) => {
  return (
    <Tabs
      fill={FILL.fixed}
      activateOnFocus
      tabs={[
        { title: 'QR Code', content: <Scan /> },
        { title: 'Enter product code', content: <ProductCodeForm /> },
      ]}
    />
  );
};

export default ClientScan;
