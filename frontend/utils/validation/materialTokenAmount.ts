import * as Yup from 'yup';
export default Yup.number()
  .required('Material amount is required')
  .positive()
  .integer();
