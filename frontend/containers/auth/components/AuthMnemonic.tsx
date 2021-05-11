import Button from '@components/Button';
import Form from '@components/form/formik/Form';
import Modal from '@components/Modal';
import React, { useState } from 'react';
import MnemonicForm, { MnemonicFormProps } from './MnemonicForm';
interface AuthMnemonicProps extends MnemonicFormProps {}

const AuthMnemonic: React.FC<AuthMnemonicProps> = ({ onSubmit }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const handleOnCreateClick = () => {
    setIsOpened(true);
  };
  const handleOnMnemonicFormSubmit = async (mnemonic, derivationPath) => {
    await onSubmit(mnemonic, derivationPath);
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
      <Button onClick={handleOnCreateClick}>Wallet from mnemonic phrase</Button>
    </>
  );
};

export default AuthMnemonic;
