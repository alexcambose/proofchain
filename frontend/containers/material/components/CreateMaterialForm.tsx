import Field from '@components/form/formik/Field';
import Form from '@components/form/formik/Form';
import React from 'react';
import { Block } from 'baseui/block';
import { FormikErrors, FormikProps, withFormik } from 'formik';
import * as bip39 from 'bip39';
import Button from '@components/Button';

interface CreateMaterialFormProps {
  onSubmit: (mnemonic: string) => void;
}
interface FormValues {
  mnemonic: string;
  confirmation: boolean;
}
const _CreateMaterialForm: React.FC<
  CreateMaterialFormProps & FormikProps<FormValues>
> = (props) => {
  const { isSubmitting } = props;
  return (
    <Form>
      <Field
        name="title"
        type="text"
        placeholder="Material title"
        label="Material title"
        caption="aa"
      />
      <Field name="title" type="text" placeholder="Material code" />

      <Button isLoading={isSubmitting} type="submit">
        Create material
      </Button>
    </Form>
  );
};
const CreateMaterialForm = withFormik<CreateMaterialFormProps, FormValues>({
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
})(_CreateMaterialForm);

export default CreateMaterialForm;
