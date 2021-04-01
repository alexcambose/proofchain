import * as React from 'react';
import QrScanner from 'qr-scanner';
import { Drawer, SIZE, ANCHOR } from 'baseui/drawer';
import QrScannerWorkerPath from '!!file-loader!node_modules/qr-scanner/qr-scanner-worker.min.js';
import { useEffect, useRef, useState } from 'react';
import QrCodeCamera from './QrCodeCamera';
import { Button } from 'baseui/button';
import { H2 } from 'baseui/typography';
import { styled, useStyletron } from 'baseui';
QrScanner.WORKER_PATH = QrScannerWorkerPath;

interface IScanProps {
  onScanSuccessful: (code: string) => void;
}
const ScanContainer = styled('div', ({ $theme }) => ({
  display: 'flex',
  marginTop: $theme.sizing.scale600,
  justifyContent: 'center',
  paddingTop: $theme.sizing.scale600,
}));
const Scan: React.FC<IScanProps> = ({ onScanSuccessful }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [css] = useStyletron();
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Scan QR Code</Button>
      <Drawer
        isOpen={isOpen}
        autoFocus
        onClose={() => setIsOpen(false)}
        size={SIZE.full}
        anchor={ANCHOR.bottom}
        showBackdrop={false}
        overrides={{
          Root: {
            style: ({ $theme }) => ({
              overflow: 'hidden',
            }),
          },
          DrawerBody: {
            style: ({ $theme }) => ({
              marginLeft: $theme.sizing.scale200,
              marginRight: $theme.sizing.scale200,
              marginBottom: 0,
            }),
          },
        }}
      >
        <H2 className={css({ position: 'absolute', top: '10px', margin: 0 })}>
          Scan
        </H2>
        <ScanContainer>
          <QrCodeCamera onScanSuccessful={onScanSuccessful} />
        </ScanContainer>
      </Drawer>
    </>
  );
};

export default Scan;
