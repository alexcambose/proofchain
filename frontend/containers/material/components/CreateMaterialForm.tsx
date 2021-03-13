import Button from '@components/Button';
import Field from '@components/form/formik/Field';
import Form from '@components/form/formik/Form';
import { createMaterial } from '@store/material/actions';
import name from '@utils/validation/name';
import { FormikErrors, FormikProps, withFormik } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';

interface CreateMaterialFormProps
  extends ReturnType<typeof mapDispatchToProps> {
  onSubmit: (mnemonic: string) => void;
}
interface FormValues {
  name: string;
  code: string;
}

const _CreateMaterialForm: React.FC<
  CreateMaterialFormProps & FormikProps<FormValues>
> = (props) => {
  const { isSubmitting } = props;
  return (
    <Form>
      <Field
        name="name"
        type="text"
        placeholder="Material name"
        label="Material name"
        caption="Descriptive material name"
      />
      <Field
        name="code"
        type="text"
        placeholder="Material code"
        caption="Optional material identification code"
      />

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
      name: '',
      code: '',
    };
  },
  validationSchema: yup.object().shape({
    name: name,
  }),
  // Add a custom validation function (this can be async too!)
  validate: async (values: FormValues) => {
    let errors: FormikErrors<any> = {};
    if (!yup.object().shape({ name }).isValidSync(values)) {
      errors['name'] = 'Name is required!';
    }
    return errors;
  },

  handleSubmit: async (values, { props }) => {
    await props.createMaterial(values);
  },
})(_CreateMaterialForm);
const mapDispatchToProps = (dispatch) => {
  return {
    createMaterial: (data) => dispatch(createMaterial(data)),
  };
};
export default connect(null, mapDispatchToProps)(CreateMaterialForm);
