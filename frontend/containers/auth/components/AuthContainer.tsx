import * as React from 'react';
import { Card, StyledBody, StyledAction } from 'baseui/card';
import { Button } from 'baseui/button';
import { Cell, Grid } from 'baseui/layout-grid';
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
  return (
    <Card title="Authentication">
      <StyledBody>
        {formElement}
        <hr />
        {socialLoginElement}
        <hr />

        <Grid>
          {/* <Cell>{metamaskElement}</Cell> */}
          <Cell>{mnemonicElement}</Cell>
        </Grid>
      </StyledBody>
    </Card>
  );
};
export default AuthContainer;
