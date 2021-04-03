import * as React from 'react';
import QrScanner from 'qr-scanner';
import { Drawer, SIZE as DRAWER_SIZE, ANCHOR } from 'baseui/drawer';
// @ts-ignore
import QrScannerWorkerPath from '!!file-loader!node_modules/qr-scanner/qr-scanner-worker.min.js';
import { useEffect, useRef, useState } from 'react';
import QrCodeCamera from './QrCodeCamera';
import { Button, SIZE } from 'baseui/button';
import { H2 } from 'baseui/typography';
import { styled, useStyletron } from 'baseui';
QrScanner.WORKER_PATH = QrScannerWorkerPath;

interface IScanProps {}
const ScanContainer = styled('div', ({ $theme }) => ({
  display: 'flex',
  marginTop: $theme.sizing.scale600,
  justifyContent: 'center',
  paddingTop: $theme.sizing.scale600,
}));
const ButtonContainer = styled('div', ({ $theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '30vh',
}));
const Scan: React.FC<IScanProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [css] = useStyletron();
  const onScanSuccessful = async (code) => {
    const ok = confirm('Scan successful. Product code: ' + code);
    if (ok) {
    }
  };
  return (
    <>
      <ButtonContainer>
        <Button size={SIZE.large} onClick={() => setIsOpen(true)}>
          Scan QR Code
        </Button>
      </ButtonContainer>
      <Drawer
        isOpen={isOpen}
        autoFocus
        onClose={() => setIsOpen(false)}
        size={DRAWER_SIZE.full}
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
