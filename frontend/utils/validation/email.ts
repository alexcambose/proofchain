import * as Yup from 'yup';
export default Yup.string().email('Invalid email').required('equired');
