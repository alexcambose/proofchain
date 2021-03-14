import Button from '@components/Button';
import { ButtonGroup, SIZE } from 'baseui/button-group';
import { toaster } from 'baseui/toast';
import { Check } from 'baseui/icon';
import config from 'config';
import React, { useState } from 'react';
import { styled } from 'baseui';
import { shortenAddress } from '@utils/eth';
const ButtonContainer = styled('div', ({ $theme }) => ({
  display: 'flex',
}));
const CopyButton = ({ hash }) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyToClipboard = () => {
    const el = document.createElement('textarea');
    el.value = hash;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setIsCopied(true);
  };
  return (
    <Button size={SIZE.mini} onClick={copyToClipboard}>
      {isCopied ? <Check /> : 'Copy'}
    </Button>
  );
};
const transactionToast = (hash) => {
  const onViewClick = () => {
    var win = window.open(
      config.ethProvider.default.etherscan + `tx/${hash}`,
      '_blank'
    );
    win.focus();
  };
  return toaster.positive(
    <>
      <div>Success! Hash: {shortenAddress(hash, 10)}</div>
      <ButtonContainer>
        <CopyButton hash={hash} />
        <Button size={SIZE.mini} onClick={onViewClick}>
          View
        </Button>
      </ButtonContainer>
    </>,
    {}
  );
};
export default transactionToast;
