import Field from '@components/form/formik/Field';
import Form from '@components/form/formik/Form';
import React from 'react';
import { Block } from 'baseui/block';
import { FormikErrors, FormikProps, withFormik } from 'formik';
import * as bip39 from 'bip39';
import Button from '@components/Button';

interface MnemonicFormProps extends FormikProps<FormValues> {
  onSubmit: (mnemonic: string) => void;
}
interface FormValues {
  mnemonic: string;
  confirmation: boolean;
}
const _MnemonicForm: React.FC<MnemonicFormProps> = (props) => {
  const { isSubmitting } = props;
  return (
    <Form>
      <Field name="mnemonic" type="textarea" placeholder="Seed words" />
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
      mnemonic: bip39.generateMnemonic(),
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
    await props.onSubmit(values.mnemonic);
  },
})(_MnemonicForm);

export default MnemonicForm;
