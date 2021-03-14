import * as Yup from 'yup';

export default Yup.string().trim().required('Amount identifier is required');
