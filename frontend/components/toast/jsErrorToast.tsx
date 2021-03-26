import { Block } from 'baseui/block';
import { Button, KIND, SIZE } from 'baseui/button';
import { toaster } from 'baseui/toast';
import * as React from 'react';
import { useEffect, useState } from 'react';

const ToastMessage = ({ message, fullMessage }) => {
  const [isExpanded, setIsExpaned] = useState(false);
  const onShowModeClick = () => {
    setIsExpaned((v) => !v);
  };
  const showMode = (
    <Block marginTop="15px" display="flex" justifyContent="left">
      <Button size={SIZE.mini} kind={KIND.secondary} onClick={onShowModeClick}>
        Show {isExpanded ? 'less' : 'more'}
      </Button>
    </Block>
  );
  return (
    <>
      {message}
      {isExpanded && <div>{fullMessage}</div>}
      {showMode}
    </>
  );
};

export default (error: Error) => {
  const message = 'Error occured!';
  const fullMessage = error.message;
  toaster.negative(
    <ToastMessage message={message} fullMessage={fullMessage} />,
    {}
  );
};
