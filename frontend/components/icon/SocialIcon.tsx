import React from 'react';
import { SocialLoginTypeEnum } from '@types/enums.ts';

import GoogleIcon from '@assets/images/social/google.svg';
// import ThemedIcon from './ThemedIcon';
interface SocialIconsPrps {
  icon: SocialLoginTypeEnum;
}
const iconStyle = { fontSize: '1.4rem' };
const icons = {
  [SocialLoginTypeEnum.GOOGLE]: GoogleIcon,
};

const SocialIcon: React.FC<SocialIconsPrps> = ({ icon }) => {
  const IconComponent = icons[icon];
  return <IconComponent />;
  // return (
  //   <ThemedIcon
  //     icon={(props) => <IconComponent style={iconStyle} {...props} />}
  //   />
  // );
};

export default SocialIcon;
