import * as Yup from 'yup';
export default Yup.number()
  .required('Mint amount is required')
  .positive().integer();
