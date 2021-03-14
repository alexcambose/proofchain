import * as Yup from 'yup';

export default Yup.string()
  .trim()
  .min(2, 'Too Short!')
  .max(50, 'Too Long!')
  .required('Password is required');
