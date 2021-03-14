import * as Yup from 'yup';
export default Yup.string()
  .trim()
  .email('Invalid email')
  .required('Email is required');
