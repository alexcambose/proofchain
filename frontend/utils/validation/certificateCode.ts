import proofchain from 'proofchain';
import * as Yup from 'yup';
export default Yup.string()
  .trim()
  .required('Certificate code is required')
  .test(
    'certificateCode',
    'Certificate with the specified code does not exist',
    async (value) => {
      return (
        value &&
        !!(await proofchain().certificateAuthority.getByCode(parseInt(value)))
      );
    }
  );
