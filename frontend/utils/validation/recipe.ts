import * as Yup from 'yup';

export default Yup.array().of(
  Yup.object().shape({
    materialTokenId: Yup.string()
      .trim()
      .required('Material Token Id is required'),
    materialTokenAmount: Yup.number()
      .integer('Material Token Amount needs to be an integer')
      .required('Material Token Amount is required'),
  })
);
