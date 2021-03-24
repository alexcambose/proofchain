import Button, { ButtonProps } from '@components/Button';
import Modal from '@components/Modal';
import {
  ICertificate,
  ICertificateAuthority,
  ICertificateInstance,
} from 'interface';
import React, { useState } from 'react';

interface ICertificateInfoModal extends ButtonProps {
  certificateInfo: {
    certificate: ICertificate;
    certificateInstance: ICertificateInstance;
    certificateAuthority: ICertificateAuthority;
    assignEvent: any;
  };
}
const CertificateInfoModalButton: React.FC<ICertificateInfoModal> = ({
  certificateInfo,
  ...props
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const handleClick = () => {
    setIsOpened(true);
  };

  return (
    <>
      <Button {...props} onClick={handleClick} />
      <Modal
        header="Certificate Info"
        opened={isOpened}
        onClose={() => setIsOpened(false)}
      >
        aaa
      </Modal>
    </>
  );
};
export default CertificateInfoModalButton;
