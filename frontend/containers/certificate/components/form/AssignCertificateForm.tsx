import Button from '@components/Button';
import Field from '@components/form/formik/Field';
import Form from '@components/form/formik/Form';
import MaterialsUuidInput from '@components/form/formik/MaterialsUuidInput';
import { assignCertificate } from '@store/certificate/actions';
import validation from '@utils/validation';
import { FormikProps, withFormik } from 'formik';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import web3Instance from 'web3Instance';
import * as yup from 'yup';

interface AssignCertificateFormProps
  extends ReturnType<typeof mapDispatchToProps> {
  minimumStake: string;
  onSuccess?: () => void;
  certificateCode: string;
  isCompany?: boolean;
}
interface FormValues {
  materialTokenId?: string;
  companyAddress?: string;
  stake: string;
  code: string;
}
const _AssignCertificateForm: React.FC<
  AssignCertificateFormProps & FormikProps<FormValues>
> = (props) => {
  const {
    isSubmitting,
    values,
    minimumStake,
    setFieldValue,
    isCompany,
  } = props;
  useEffect(() => {
    setFieldValue('stake', web3Instance().utils.fromWei(minimumStake, 'ether'));
  }, [minimumStake]);
  const minimumStakeEth = web3Instance().utils.fromWei(minimumStake, 'ether');
  return (
    <Form>
      <Field
        name="code"
        type="text"
        placeholder="Certificate code"
        label="Certificate code"
        caption="Code for the certificate you want to assign"
      />
      {isCompany ? (
        <Field
          name="companyAddress"
          type="text"
          placeholder="Company Address"
          label="Company Address"
          caption="Company address to assign the certificate"
        />
      ) : (
        <Field
          name="materialTokenId"
          type="text"
          placeholder="Material Id"
          label="Material id"
          caption="Mateirial id to assign the certificate"
        />
      )}
      <Field
        name="stake"
        type="number"
        min={minimumStakeEth}
        step={0.0000001}
        endEnhancer={() => 'ETH'}
        placeholder="Stake"
        label="Certificate assignment stake"
        caption={'Minimum stake: ' + minimumStakeEth + ' ETH'}
      />
      <Button isLoading={isSubmitting} disabled={isSubmitting} type="submit">
        Assign Certificate
      </Button>
    </Form>
  );
};
const AssignCertificateForm = withFormik<
  AssignCertificateFormProps,
  FormValues
>({
  // Transform outer props into form values
  mapPropsToValues: ({ certificateCode }) => {
    return {
      materialTokenId: '',
      code:
        certificateCode && certificateCode !== undefined ? certificateCode : '',
      stake: '0',
    };
  },

  validationSchema: (props) =>
    yup.object().shape(
      props.isCompany
        ? {
            code: validation.certificateCode,
            companyAddress: validation.companyAddress,
            stake: validation.stake,
          }
        : {
            code: validation.certificateCode,
            materialTokenId: validation.materialTokenId,
            stake: validation.stake,
          }
    ),
  handleSubmit: async (values, { props }) => {
    const { assignCertificate, onSuccess } = props;
    console.log(values);
    await assignCertificate({
      ...values,
      stake: web3Instance().utils.toWei(values.stake, 'ether'),
    });
    onSuccess && onSuccess();
  },
})(_AssignCertificateForm);
const mapDispatchToProps = (dispatch) => {
  return {
    assignCertificate: (data) => dispatch(assignCertificate(data)),
  };
};
export default connect(null, mapDispatchToProps)(AssignCertificateForm);
