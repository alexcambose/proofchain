import Button from '@components/Button';
import BatchIdsInput from '@components/form/formik/BatchIdsInput';
import Field from '@components/form/formik/Field';
import Form from '@components/form/formik/Form';
import { initiateTransport } from '@store/transport/actions';
import { isDevelopment } from '@utils/next';
import validation from '@utils/validation';
import { FormikProps, withFormik } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';

interface CreateTransportFormProps
  extends ReturnType<typeof mapDispatchToProps> {
  isRawTransport?: boolean;
  onSuccess?: () => void;
}
interface FormValues {
  receiver: string;
  transportCompany: string;
  batchIds: number[];
}
const _CreateTransportForm: React.FC<
  CreateTransportFormProps & FormikProps<FormValues>
> = (props) => {
  const { isSubmitting, values, isRawTransport } = props;
  return (
    <Form>
      <BatchIdsInput />
      <Field
        name="receiver"
        type="text"
        placeholder="Transport receiver"
        label="Transport receiver"
        caption="Transport receiver"
      />
      <Field
        name="transportCompany"
        type="text"
        placeholder="Transport company"
        label="Transport company"
        caption="Transport identification company"
      />

      <Button isLoading={isSubmitting} disabled={isSubmitting} type="submit">
        Create Transport
      </Button>
    </Form>
  );
};
const CreateTransportForm = withFormik<CreateTransportFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: () => {
    return {
      receiver: isDevelopment()
        ? '0x92f28A28BEBAa0150d6A50752aB0AbC2FC3D0D35'
        : '',
      transportCompany: isDevelopment()
        ? '0x15Af53F1ceA4f68710DF740538B26d0A90197B94'
        : '',
      batchIds: [],
    };
  },
  validationSchema: (props) =>
    yup.object().shape({
      receiver: validation.companyAddress,
      transportCompany: validation.transportCompany,
      // batchIds:
    }),
  handleSubmit: async (values, { props }) => {
    const { createTransport, onSuccess } = props;
    const { receiver, transportCompany, batchIds } = values;
    // console.log(values);
    await createTransport({
      receiver: receiver.trim(),
      transportCompany: transportCompany.trim(),
      batchIds,
    });
    onSuccess && onSuccess();
  },
})(_CreateTransportForm);
const mapDispatchToProps = (dispatch) => {
  return {
    createTransport: (data) => dispatch(initiateTransport(data)),
  };
};
export default connect(null, mapDispatchToProps)(CreateTransportForm);
