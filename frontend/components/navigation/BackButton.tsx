import { useRouter } from 'next/router';
import React from 'react';
import Button from '../Button';
import { ArrowLeft } from 'baseui/icon';
import { KIND } from 'baseui/button';
const BackButton = () => {
  const router = useRouter();
  const onBackClicked = () => {
    router.back();
  };
  return (
    <Button overrides={{}} kind={KIND.tertiary} onClick={onBackClicked}>
      <ArrowLeft size={20} />
      Back
    </Button>
  );
};
export default BackButton;
