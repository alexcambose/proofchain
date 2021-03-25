import React, { useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { styled } from 'baseui';

interface QrCodeProps {
  children: string | number;
}
const Container = styled('div', () => ({
  textAlign: 'center',
}));
const QrCode: React.FC<QrCodeProps> = ({ children }) => {
  const canvasEl = useRef(null);
  useEffect(() => {
    QRCode.toCanvas(canvasEl.current, children, {
      scale: 10,
      qzone: 0,
      width: 204,
    });
  }, [children]);
  return (
    <Container>
      <canvas ref={canvasEl} />
    </Container>
  );
};

export default QrCode;
