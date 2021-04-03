import Button from '@components/Button';
import Field from '@components/form/formik/Field';
import Form from '@components/form/formik/Form';
import MaterialsUuidInput from '@components/form/formik/MaterialsUuidInput';
import { certificateTypeOptions } from '@components/tag/CertificareTypeTag';
import { CertificateTypeEnum } from '@enums';
import { createCertificate } from '@store/certificate/actions';
import validation from '@utils/validation';
import { FormikProps, withFormik } from 'formik';
import React from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';

interface CreateCertificateFormProps
  extends ReturnType<typeof mapDispatchToProps> {
  onSuccess?: () => void;
}
interface FormValues {
  materialsUuid: any;
  code: string;
  type: CertificateTypeEnum;
}

const _CreateCertificateForm: React.FC<
  CreateCertificateFormProps & FormikProps<FormValues>
> = (props) => {
  const { isSubmitting, values } = props;
  return (
    <Form>
      <Field
        name="name"
        type="text"
        placeholder="Certificate name"
        label="Certificate name"
        caption="A name for the certificate"
      />
      <Field
        name="description"
        type="text"
        placeholder="Certificate description"
        label="Certificate description"
        caption="(Optional) A useful description for the certificate"
      />
      <Field
        label="Certificate Type"
        name="type"
        type="select"
        options={certificateTypeOptions}
        valueKey="id"
        labelKey="label"
        clearable={false}
        searchable={false}
        value={values.type}
      />
      <Button isLoading={isSubmitting} disabled={isSubmitting} type="submit">
        Create Certificate
      </Button>
    </Form>
  );
};
const CreateCertificateForm = withFormik<
  CreateCertificateFormProps,
  FormValues
>({
  // Transform outer props into form values
  mapPropsToValues: () => {
    return {
      materialsUuid: [],
      code: '',
      type: certificateTypeOptions[0].id,
    };
  },

  validationSchema: yup.object().shape({
    name: validation.name,
  }),
  handleSubmit: async (values, { props }) => {
    const { createCertificate, onSuccess } = props;
    await createCertificate(values);
    onSuccess && onSuccess();
  },
})(_CreateCertificateForm);
const mapDispatchToProps = (dispatch) => {
  return {
    createCertificate: (data) => dispatch(createCertificate(data)),
  };
};
export default connect(null, mapDispatchToProps)(CreateCertificateForm);
