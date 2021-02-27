import { Formik, FormikConfig, FormikValues, Form as FormikForm } from 'formik';
interface FormProps {
  children: React.ReactNode;
}
const Form: React.FC<FormProps> = ({ children, ...props }) => {
  return <FormikForm>{children}</FormikForm>;
};

export default Form;
