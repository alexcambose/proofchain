import React, { useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { styled, useStyletron } from 'baseui';
import { StyledLink } from 'baseui/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, KIND, SIZE } from 'baseui/button';

interface QrCodeProps {
  children: string | number;
}
const Container = styled('div', () => ({
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  display: 'flex',
}));
const QrCode: React.FC<QrCodeProps> = ({ children }) => {
  const [css, theme] = useStyletron();
  const canvasEl = useRef(null);
  useEffect(() => {
    QRCode.toCanvas(canvasEl.current, children, {
      scale: 10,
      qzone: 0,
      width: 204,
      color: {
        dark: theme.colors.accent,
      },
    });
  }, [children]);
  const onDownloadClick = async () => {
    const result = await QRCode.toDataURL(children, {
      scale: 10,
      qzone: 0,
      width: 204,
      color: {
        dark: theme.colors.accent,
      },
    });
    const link = document.createElement('a');
    link.href = result;
    link.download = children + '.png';
    link.click();
  };
  return (
    <Container>
      <canvas ref={canvasEl} />
      <Button
        onClick={onDownloadClick}
        kind={KIND.secondary}
        size={SIZE.compact}
      >
        <FontAwesomeIcon icon="download" />
      </Button>
    </Container>
  );
};

export default QrCode;
