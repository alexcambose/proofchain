import Button from '@components/Button';
import FormikField from '@components/form/formik/Field';
import Form from '@components/form/formik/Form';
import { fetchTransportInfo } from '@store/transport/actions';
import validation from '@utils/validation';
import { FormikProps, withFormik } from 'formik';
import { ITransport } from 'interface';
import { connect } from 'react-redux';
import keccak256 from 'keccak256';
import * as Yup from 'yup';
import proofchain from 'proofchain';
import transactionWrapper from '@utils/transactionWrapper';
interface FinaliseTransportFormProps
  extends ReturnType<typeof mapDispatchToProps> {
  transport: ITransport;
}
interface FinaliseTransportFormValues {
  password: string;
}
const _FinaliseTransportForm: React.FC<
  FinaliseTransportFormProps & FormikProps<FinaliseTransportFormValues>
> = ({ transport }) => {
  return (
    <Form>
      {transport.hashedPassword && (
        <FormikField
          label="Hashed password"
          name="password"
          palceholder="Password"
          caption="The keccak256 of the password set by the sender."
        />
      )}
      <Button type="submit">Finalise transport</Button>
    </Form>
  );
};
const FinaliseTransportForm = withFormik<
  FinaliseTransportFormProps,
  FinaliseTransportFormValues
>({
  // Transform outer props into form values
  mapPropsToValues: () => {
    return {
      password: '',
    };
  },

  validate: (values, { transport }) => {
    const errors: any = {};
    console.log(
      keccak256(values.password).toString('hex'),
      transport.hashedPassword
    );
    if (
      transport.hashedPassword &&
      keccak256(values.password).toString('hex') !== transport.hashedPassword
    ) {
      errors.hashedPassword = 'Incorrect Password';
    }

    return errors;
  },
  handleSubmit: async (values, { props }) => {
    const result = await transactionWrapper(
      proofchain().transport.finaliseTransport({
        transportId: props.transport.transportId,
        password: values.password,
      })
    );
    if (result) {
      await props.fetchTransportInfo({
        transportId: props.transport.transportId,
      });
    }
    console.log(values);
  },
})(_FinaliseTransportForm);

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTransportInfo: ({ transportId }) =>
      dispatch(fetchTransportInfo({ transportId })),
  };
};
export default connect(null, mapDispatchToProps)(FinaliseTransportForm);
