import * as React from 'react';
import { StyledBody, StyledAction } from 'baseui/card';
import { Block } from 'baseui/block';
import TooltipIcon from '@components/icon/TooltipIcon';
import SecurityIcon from '@assets/images/icons/security.svg';
import Card from '@components/Card';
interface AuthContainerProps {
  formElement?: React.ReactNode;
  socialLoginElement?: React.ReactNode;
  mnemonicElement?: React.ReactNode;
  metamaskElement?: React.ReactNode;
}
const AuthContainer: React.FC<AuthContainerProps> = ({
  formElement,
  socialLoginElement,
  mnemonicElement,
  metamaskElement,
}) => {
  const title = (
    <Block
      overrides={{
        Block: {
          style: { display: 'flex', justifyContent: 'space-between' },
        },
      }}
    >
      <span>Authentication</span>
      <span>
        <TooltipIcon icon={SecurityIcon}>
          We do NOT own your private keys and cannot access your funds. This is
          your own non-custodial crypto wallet that only you have the keys for.
        </TooltipIcon>
      </span>
    </Block>
  );
  return (
    <Card title={title}>
      <StyledBody>
        {/* {formElement}
        <hr /> */}
        {socialLoginElement}
        <hr />

        {mnemonicElement}
      </StyledBody>
    </Card>
  );
};
export default AuthContainer;
