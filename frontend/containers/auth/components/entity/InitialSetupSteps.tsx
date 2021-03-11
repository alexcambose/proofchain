import * as React from 'react';
import { ProgressSteps, NumberedStep } from 'baseui/progress-steps';
import { Button, SHAPE, ButtonProps, KIND, SIZE } from 'baseui/button';
import { useStyletron } from 'baseui';
import { Card, StyledBody } from 'baseui/card';
import { Label4 } from 'baseui/typography';
import { RadioGroup, Radio, ALIGN } from 'baseui/radio';
import { useState } from 'react';
import CreateEntityForm from './CreateEntityForm';

type EntityType = 'company' | 'certificateAuthority';
interface ISpacedButtonProps extends ButtonProps {
  primary?: boolean;
}
const SpacedButton: React.FC<ISpacedButtonProps> = ({ primary, ...props }) => {
  return (
    <Button
      {...props}
      kind={primary ? KIND.primary : KIND.secondary}
      size={SIZE.compact}
      overrides={{
        BaseButton: {
          style: ({ $theme }) => ({
            marginLeft: $theme.sizing.scale200,
            marginRight: $theme.sizing.scale200,
            marginTop: $theme.sizing.scale800,
          }),
        },
      }}
    />
  );
};
const InitialSetupSteps = () => {
  const [current, setCurrent] = useState(0);
  const [entityType, setEntityType] = useState<EntityType>('company');

  const [css, theme] = useStyletron();
  const onRadioChanged = (e) => {
    setEntityType(e.target.value);
  };
  return (
    <Card title={'Initial setup'}>
      <Label4>Your account doesn't have any associated entities</Label4>
      <StyledBody>
        <ProgressSteps current={current}>
          <NumberedStep title="Select entity type">
            <div className={css({ ...theme.typography.ParagraphSmall })}>
              <RadioGroup
                value={entityType}
                onChange={onRadioChanged}
                name="number"
                overrides={{
                  RadioGroupRoot: {
                    style: ({ $theme }) => ({
                      maxWidth: '100%',
                    }),
                  },
                }}
                align={ALIGN.vertical}
              >
                <Radio
                  value="company"
                  description="Creates and manufactures materials and products"
                >
                  Company
                </Radio>
                <Radio
                  value="certificateAuthority"
                  description="Emits certificates for companies, products and materials"
                >
                  Certificate Authority
                </Radio>
              </RadioGroup>
            </div>
            <SpacedButton disabled>Previous</SpacedButton>
            <SpacedButton onClick={() => setCurrent(1)}>Next</SpacedButton>
          </NumberedStep>
          <NumberedStep title="Fill information">
            <div className={css({ ...theme.typography.ParagraphSmall })}>
              <CreateEntityForm
                isCertificateAuthority={entityType === 'certificateAuthority'}
                submitButtons={(isLoading) => (
                  <>
                    <SpacedButton onClick={() => setCurrent(0)}>
                      Previous
                    </SpacedButton>
                    <SpacedButton primary type="submit" isLoading={isLoading}>
                      Create entity
                    </SpacedButton>
                  </>
                )}
              />
            </div>
          </NumberedStep>
        </ProgressSteps>
      </StyledBody>
    </Card>
  );
};
export default InitialSetupSteps;
