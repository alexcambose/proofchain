import Button from '@components/Button';
import SocialIcon from '@components/icon/SocialIcon';
import { SocialLoginTypeEnum } from '@types/enums.ts';
import { KIND } from 'baseui/button';
import React, { useState } from 'react';
import uuid from 'react-uuid';

interface SocialButtonsProps {
  onClick: (loginType: SocialLoginTypeEnum) => Promise<void>;
}

const SocialButtons: React.FC<SocialButtonsProps> = ({ onClick }) => {
  const [loadingType, setLoadingType] = useState<SocialLoginTypeEnum>(null);
  const [error, setError] = useState(null);

  const handleClick = async (loginType) => {
    setError(null);
    try {
      setLoadingType(loginType);
      await onClick(loginType);
    } catch (e) {
      setError(e.message);
    }
    setLoadingType(null);
  };
  const loginButtons = [SocialLoginTypeEnum.GOOGLE].map((loginType) => (
    <Button
      key={uuid()}
      startEnhancer={() => <SocialIcon icon={loginType} />}
      onClick={() => handleClick(loginType)}
      kind={KIND.secondary}
      isLoading={loadingType === loginType}
    >
      Continue with {loginType}
    </Button>
  ));
  return (
    <>
      {/* <SecurityInfo /> */}
      {loginButtons}

      {/* {error && <Label2 color="negative">Error: {error}</Label2>} */}
    </>
  );
};

export default SocialButtons;
