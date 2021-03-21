import Button from '@components/Button';
import Field from '@components/form/formik/Field';
import Form from '@components/form/formik/Form';
import MaterialsUuidInput from '@components/form/formik/MaterialsUuidInput';
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
  materialsUuid: any;
  code: string;
}
const _CreateBatchForm: React.FC<
  CreateBatchFormProps & FormikProps<FormValues>
> = (props) => {
  const { isSubmitting, values } = props;
  return (
    <Form>
      <MaterialsUuidInput />

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
  mapPropsToValues: () => {
    return {
      materialsUuid: [],
      code: '',
    };
  },

  validationSchema: yup.object().shape({
    // materialsUuid: validation.materialTokenId,

    // materialTokenAmount: validation.materialTokenAmount,
    code: validation.batchCode,
  }),
  handleSubmit: async (values, { props }) => {
    const { createBatch, onSuccess } = props;
    const { code, materialsUuid } = values;
    await createBatch({
      code,
      materialsUuid: materialsUuid.map((e) => e.id),
    });
    onSuccess && onSuccess();
  },
})(_CreateBatchForm);
const mapDispatchToProps = (dispatch) => {
  return {
    createBatch: (data) => dispatch(createBatch(data)),
  };
};
export default connect(null, mapDispatchToProps)(CreateBatchForm);
