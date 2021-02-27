import { Formik, FormikConfig, FormikValues, Form } from 'formik';
interface FormProps {
  children: React.ReactNode;
}
const CustomForm: React.FC<FormProps> = ({ children, ...props }) => {
  return (
    // <Formik {...props}>
    <Form>{children}</Form>
    // </Formik>
  );
};

export default CustomForm;
