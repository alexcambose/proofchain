import * as React from 'react';
import { Card, StyledBody, StyledAction } from 'baseui/card';
import { Button } from 'baseui/button';
interface AuthContainerProps {
  formElement?: React.ReactNode;
  socialLoginElement?: React.ReactNode;
  mnemonicElement?: React.ReactNode;
}
const AuthContainer: React.FC<AuthContainerProps> = ({
  formElement,
  socialLoginElement,
  mnemonicElement,
}) => {
  return (
    <Card title="Authentication">
      <StyledBody>{formElement}</StyledBody>
    </Card>
  );
};
export default AuthContainer;
