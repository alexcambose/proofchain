import Button from '@components/Button';
import Field from '@components/form/formik/Field';
import Form from '@components/form/formik/Form';
import { createBatch } from '@store/batch/actions';
import validation from '@utils/validation';
import { FormikProps, withFormik } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';

interface CreateBatchFormProps extends ReturnType<typeof mapDispatchToProps> {
  onSuccess?: () => void;
}
interface FormValues {
  materialTokenId: number;
  materialTokenAmount: number;
  code: string;
}
const _CreateBatchForm: React.FC<
  CreateBatchFormProps & FormikProps<FormValues>
> = (props) => {
  const { isSubmitting, values } = props;
  return (
    <Form>
      <Field
        name="materialTokenId"
        type="text"
        placeholder="Material Id"
        label="Material Id"
        caption="The id of the material that needs to be added to the batch"
      />
      <Field
        name="materialTokenAmount"
        type="text"
        placeholder="Material amount"
        label="Material amount"
        caption="The amount of materials that will be added to the batch"
      />
      <Field
        name="code"
        type="text"
        placeholder="Batch code"
        label="Batch code"
        caption="(optional) A batch identification code"
      />

      <Button isLoading={isSubmitting} disabled={isSubmitting} type="submit">
        Create Batch
      </Button>
    </Form>
  );
};
const CreateBatchForm = withFormik<CreateBatchFormProps, FormValues>({
  // Transform outer props into form values

  validationSchema: yup.object().shape({
    materialTokenId: validation.materialTokenId,

    materialTokenAmount: validation.materialTokenAmount,
    code: validation.batchCode,
  }),
  handleSubmit: async (values, { props }) => {
    const { createBatch, onSuccess } = props;
    console.log(values);
    await createBatch(values);
    onSuccess && onSuccess();
  },
})(_CreateBatchForm);
const mapDispatchToProps = (dispatch) => {
  return {
    createBatch: (data) => dispatch(createBatch(data)),
  };
};
export default connect(null, mapDispatchToProps)(CreateBatchForm);
