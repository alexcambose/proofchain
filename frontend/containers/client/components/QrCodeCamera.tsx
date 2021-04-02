import * as React from 'react';
import QrScanner from 'qr-scanner';
import QrScannerWorkerPath from '!!file-loader!node_modules/qr-scanner/qr-scanner-worker.min.js';
import { useEffect, useRef, useState } from 'react';
import { ButtonGroup, SIZE } from 'baseui/button-group';
import { styled, useStyletron } from 'baseui';
import { Button } from 'baseui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
QrScanner.WORKER_PATH = QrScannerWorkerPath;

interface IQrCodeCameraProps {
  onScanSuccessful: (data: string) => void;
}
const FullButton = styled(Button, ({ $theme }) => ({
  flex: 1,
}));
const Video = styled('video', ({ $theme }) => ({
  width: '100%',
  height: 'auto',
}));
const QrCodeCamera: React.FC<IQrCodeCameraProps> = ({ onScanSuccessful }) => {
  const videoElem = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [hasFlash, setHasFlash] = useState(false);
  const [qrScanner, setQrScanner] = useState(null);
  useEffect(() => {
    const qrScannerInstance = new QrScanner(videoElem.current, (result) =>
      console.log('decoded qr code:', result)
    );

    qrScannerInstance.start();
    setQrScanner(qrScannerInstance);
    (async () => {
      setHasFlash(await qrScannerInstance.hasFlash());
    })();
    return () => {
      qrScannerInstance.stop();
      qrScannerInstance.destroy();
    };
  }, []);
  return (
    <div>
      <Video ref={videoElem}></Video>
      <ButtonGroup size={SIZE.large}>
        {hasFlash && (
          <FullButton onClick={() => qrScanner.toggleFlash()}>
            <FontAwesomeIcon icon="lightbulb" />
            Toggle flash
          </FullButton>
        )}
      </ButtonGroup>
    </div>
  );
};

export default QrCodeCamera;
