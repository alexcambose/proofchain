import Field from '@components/form/formik/Field';
import Form from '@components/form/formik/Form';
import React, { useState } from 'react';
import { Block } from 'baseui/block';
import { FormikErrors, FormikProps, withFormik } from 'formik';
import * as bip39 from 'bip39';
import Button from '@components/Button';
import { KIND, SIZE } from 'baseui/button';
import { StyledLink } from 'baseui/link';
import { isDevelopment } from '@utils/next';

export interface MnemonicFormProps {
  onSubmit: (mnemonic: string, derivationPath: string) => void;
}
interface FormValues {
  mnemonic: string;
  derivationPath: string;
  confirmation: boolean;
}
const _MnemonicForm: React.FC<MnemonicFormProps & FormikProps<FormValues>> = (
  props
) => {
  const { isSubmitting } = props;
  const [isAdvancedVisibile, setIsAdvancedVisible] = useState(false);
  const onAdvancedClick = () => {
    setIsAdvancedVisible((v) => !v);
  };
  return (
    <Form>
      <Field
        name="mnemonic"
        type="textarea"
        placeholder="Seed words"
        caption={
          <Block display="flex" justifyContent="space-between">
            <Block flex="10">12 words mnemonic</Block>
            <Block flex="2" $style={{ textAlign: 'right' }}>
              <StyledLink href="#" onClick={onAdvancedClick}>
                Advanced
              </StyledLink>
            </Block>
          </Block>
        }
      />
      {isAdvancedVisibile && (
        <Field
          name="derivationPath"
          type="text"
          label="Derivation path"
          placeholder="Seed words"
          caption="HD Wallet derivation path. Only modify if you know what you are doing."
        />
      )}

      <Block padding="scale300">
        <Field
          name="confirmation"
          type="checkbox"
          label="I’ve copied it somewhere safe."
          formControl={false}
        />
      </Block>
      <Button isLoading={isSubmitting} type="submit">
        Import
      </Button>
    </Form>
  );
};
const MnemonicForm = withFormik<MnemonicFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      mnemonic: isDevelopment()
        ? `stage analyst reform dune educate throw exile disagree pause search crouch finger`
        : bip39.generateMnemonic(),
      derivationPath: `m/44'/60'/0'/0/0`,
      confirmation: false,
    };
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    let errors: FormikErrors<any> = {};
    if (values.mnemonic && !bip39.validateMnemonic(values.mnemonic)) {
      errors.mnemonic = 'Invalid seed words';
    }
    if (!values.confirmation) {
      errors.confirmation = ' ';
    }
    return errors;
  },

  handleSubmit: async (values, { props }) => {
    await props.onSubmit(values.mnemonic, values.derivationPath);
  },
})(_MnemonicForm);

export default MnemonicForm;
