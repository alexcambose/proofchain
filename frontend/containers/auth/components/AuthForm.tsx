import Button from '@components/Button';
import FormikField from '@components/form/formik/Field';
import Form from '@components/form/formik/Form';
import validation from '@utils/validation';
import { withFormik } from 'formik';
import * as Yup from 'yup';
interface AuthFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
}
interface AuthFormValues {
  email: string;
  password: string;
}
const _AuthForm: React.FC = () => {
  return (
    <Form>
      <FormikField label="Email" name="email" />
      <FormikField label="Password" name="password" type="password" />
      <Button type="submit">Login/Sign Up</Button>
    </Form>
  );
};
const AuthForm = withFormik<AuthFormProps, AuthFormValues>({
  // Transform outer props into form values
  mapPropsToValues: () => {
    return {
      email: 'test@test.com',
      password: '123456778',
    };
  },

  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.object().shape({
    email: validation.email,
    password: validation.password,
  }),

  handleSubmit: async (values, { props }) => {
    const { email, password } = values;
    await props.onSubmit(email, password);
  },
})(_AuthForm);
export default AuthForm;
