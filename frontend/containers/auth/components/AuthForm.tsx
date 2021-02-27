import Button from '@components/Button';
import FormikField from '@components/form/formik/Field';
import Form from '@components/form/formik/Form';
import validation from '@utils/validation';
import { withFormik } from 'formik';
import * as Yup from 'yup';

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
const AuthForm = withFormik<{}, AuthFormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      email: '',
      password: '',
    };
  },

  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.object().shape({
    email: validation.email,
    password: validation.password,
  }),

  handleSubmit: (values) => {
    console.log(values);
  },
})(_AuthForm);
export default AuthForm;
