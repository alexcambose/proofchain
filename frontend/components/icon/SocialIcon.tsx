import React from 'react';
import { SocialLoginTypeEnum } from '@enums';

import GoogleIcon from '@assets/images/social/google.svg';
import MetamaskIcon from '@assets/images/social/metamask.svg';
import IconContainer from './IconContainer';
// import ThemedIcon from './ThemedIcon';
interface SocialIconsPrps {
  icon: SocialLoginTypeEnum;
}
const iconStyle = { fontSize: '1.4rem' };
const icons = {
  [SocialLoginTypeEnum.GOOGLE]: GoogleIcon,
  [SocialLoginTypeEnum.METAMASK]: MetamaskIcon,
};

const SocialIcon: React.FC<SocialIconsPrps> = ({ icon }) => {
  const IconComponent = icons[icon];
  return (
    <IconContainer
      style={iconStyle}
      icon={(props) => <IconComponent {...props} />}
    />
  );
};

export default SocialIcon;
