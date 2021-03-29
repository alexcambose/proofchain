import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from 'baseui';
import { Display1, Display4 } from 'baseui/typography';
import React, { useState } from 'react';
import Modal from './Modal';
import QrCode from './QrCode';

interface IMaterialUuidQrModalProps {
  materialUuid: number;
  trigger?: (onClick: () => void) => React.ReactNode;
}
const QrButton = styled('span', ({ $theme }) => ({
  cursor: 'pointer',
  marginRight: $theme.sizing.scale300,
}));
const MaterialUuidQrModal: React.FC<IMaterialUuidQrModalProps> = ({
  materialUuid,
  trigger,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const handleClick = () => {
    setIsOpened(true);
  };

  return (
    <>
      {trigger ? (
        trigger(handleClick)
      ) : (
        <QrButton>
          <FontAwesomeIcon onClick={handleClick} icon="qrcode" />
        </QrButton>
      )}
      <Modal
        overrides={{
          Dialog: {},
        }}
        header="Material UUID - QR Code"
        opened={isOpened}
        onClose={() => setIsOpened(false)}
      >
        <QrCode>{materialUuid}</QrCode>
        <Display4 $style={{ fontSize: '130%', textAlign: 'center' }}>
          Material UUID: {materialUuid}
        </Display4>
      </Modal>
    </>
  );
};
export default MaterialUuidQrModal;
