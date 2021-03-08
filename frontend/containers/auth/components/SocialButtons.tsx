import Button from '@components/Button';
import Notification from '@components/Notification';
import SocialIcon from '@components/icon/SocialIcon';
import { SocialLoginTypeEnum } from '@enums';
import { KIND } from 'baseui/button';
import React, { useState } from 'react';
import uuid from 'react-uuid';
import { KIND as NotificationKIND } from 'baseui/notification';

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
  const loginButtons = [
    SocialLoginTypeEnum.METAMASK,
    SocialLoginTypeEnum.GOOGLE,
  ].map((loginType) => (
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

      {error && (
        <Notification kind={NotificationKIND.negative}>{error}</Notification>
      )}
    </>
  );
};

export default SocialButtons;
