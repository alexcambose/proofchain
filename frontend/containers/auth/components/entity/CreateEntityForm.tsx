import Button from '@components/Button';
import FormikField from '@components/form/formik/Field';
import Form from '@components/form/formik/Form';
import validation from '@utils/validation';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { EntityTypeEnum } from '@enums';
interface CreateEntityFormProps {
  // onSubmit: (email: string, password: string) => Promise<void>;
}
interface CreateEntityFormValues {
  name: string;
  entityType: string;
}
const _CreateEntityForm: React.FC = () => {
  return (
    <Form>
      <FormikField label="Email" name="email" />
      <FormikField
        label="Entity type"
        name="entityType"
        type="select"
        options={[
          {
            label: 'Company',
            id: EntityTypeEnum.MANUFACTURER,
          },
          {
            label: 'Logistic entity',
            id: EntityTypeEnum.LOGISTIC,
          },
          {
            label: 'Warehouse',
            id: EntityTypeEnum.WAREHOUSE,
          },
          {
            label: 'Retailer',
            id: EntityTypeEnum.RETAILER,
          },
        ]}
      />
      <Button type="submit">Login/Sign Up</Button>
    </Form>
  );
};
const CreateEntityForm = withFormik<
  CreateEntityFormProps,
  CreateEntityFormValues
>({
  // Transform outer props into form values
  mapPropsToValues: () => {
    return {
      name: '',
      entityType: '',
    };
  },

  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.object().shape({
    email: validation.email,
    password: validation.password,
  }),

  handleSubmit: async (values, { props }) => {
    const { name, entityType } = values;
    // await props.onSubmit(name, entityType);
  },
})(_CreateEntityForm);
export default CreateEntityForm;
