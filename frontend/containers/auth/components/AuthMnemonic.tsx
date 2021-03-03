import Button from '@components/Button';
import Form from '@components/form/formik/Form';
import Modal from '@components/Modal';
import React, { useState } from 'react';
import MnemonicForm from './MnemonicForm';
interface AuthMnemonicProps {
  onSubmit: (mnemonic: string) => void;
}

const AuthMnemonic: React.FC<AuthMnemonicProps> = ({ onSubmit }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const handleOnCreateClick = () => {
    setIsOpened(true);
  };
  const handleOnMnemonicFormSubmit = (mnemonic) => {
    onSubmit(mnemonic);
    setIsOpened(false);
  };
  return (
    <>
      <Modal
        header="Mnemonic phrase"
        opened={isOpened}
        onClose={() => setIsOpened(false)}
      >
        <MnemonicForm onSubmit={handleOnMnemonicFormSubmit} />
      </Modal>
      <Button onClick={handleOnCreateClick}>Create from mnemonic phrase</Button>
    </>
  );
};

export default AuthMnemonic;