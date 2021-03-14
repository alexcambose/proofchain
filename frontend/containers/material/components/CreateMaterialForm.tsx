import Button from '@components/Button';
import Field from '@components/form/formik/Field';
import Form from '@components/form/formik/Form';
import MaterialRecipeSpecifier from '@components/MaterialRecipeSpecifier';
import { createMaterial } from '@store/material/actions';
import { capitalizeFirstLetter } from '@utils/misc';
import name from '@utils/validation/name';
import { TYPE } from 'baseui/select';
import { FormikErrors, FormikProps, withFormik } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';
import commonUnits from '../../../data/commonUnits.json';
interface CreateMaterialFormProps
  extends ReturnType<typeof mapDispatchToProps> {
  isRawMaterial?: boolean;
  onSuccess?: () => void;
}
interface FormValues {
  name: string;
  code: string;
  amountIdentifier: any;
}
const unitsOfMeasurement = commonUnits.map((e, i) => ({
  label: capitalizeFirstLetter(e['Name']) + ' - ' + e['Symbol'],
  id: e['Symbol'],
}));
const _CreateMaterialForm: React.FC<
  CreateMaterialFormProps & FormikProps<FormValues>
> = (props) => {
  // console.log(unitsOfMeasurement);
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
      <Field
        label="Amount indentifier"
        caption="The identifier of one unit of this material. (eg: 1 liter of water)"
        name="amountIdentifier"
        type={'select'}
        options={unitsOfMeasurement}
        valueKey="id"
        labelKey="label"
        overrides={{
          Dropdown: {
            style: ({ $theme }) => ({ maxHeight: '22vh' }),
          },
        }}
      />
      <MaterialRecipeSpecifier />
      <Button isLoading={isSubmitting} disabled={isSubmitting} type="submit">
        Create material
      </Button>
    </Form>
  );
};
const CreateMaterialForm = withFormik<CreateMaterialFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: () => {
    return {
      name: '',
      code: '',
      amountIdentifier: 'kg',
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
    const { createMaterial, onSuccess } = props;
    await createMaterial(values);
    onSuccess && onSuccess();
  },
})(_CreateMaterialForm);
const mapDispatchToProps = (dispatch) => {
  return {
    createMaterial: (data) => dispatch(createMaterial(data)),
  };
};
export default connect(null, mapDispatchToProps)(CreateMaterialForm);
