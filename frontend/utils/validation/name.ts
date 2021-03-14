import * as Yup from 'yup';
export default Yup.string().trim().required('Name is required');
