// @ts-ignore
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from 'baseui';
import { Button } from 'baseui/button';
import { ButtonGroup, SIZE } from 'baseui/button-group';
import { useRouter } from 'next/router';
import QrScanner from 'qr-scanner';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

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
  const router = useRouter();
  const videoElem = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [hasFlash, setHasFlash] = useState(false);
  const [qrScanner, setQrScanner] = useState(null);
  useEffect(() => {
    QrScanner.WORKER_PATH = '/qr-scanner-worker.min.js';

    const qrScannerInstance = new QrScanner(videoElem.current, (result) => {
      if (confirm('Material code: ' + result + '. Is that correct ?')) {
        // Save it!
        router.push('/client/' + result);
      }
    });

    qrScannerInstance.start().then(() => {
      console.log('start');
    });
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
