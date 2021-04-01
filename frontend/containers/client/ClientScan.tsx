import * as React from 'react';
import { useState } from 'react';
import Scan from './components/Scan';
import { Drawer, SIZE, ANCHOR } from 'baseui/drawer';
import { FILL, Tab, StatefulTabs } from 'baseui/tabs-motion';
import { Button } from 'baseui/button';

interface IClientScanProps {}

const ClientScan: React.FunctionComponent<IClientScanProps> = (props) => {
  return (
    <StatefulTabs fill={FILL.fixed} activateOnFocus>
      <Tab title="QR Code">
        <Scan />
      </Tab>
      <Tab title="Enter product code">Content 2</Tab>
    </StatefulTabs>
  );
};

export default ClientScan;
