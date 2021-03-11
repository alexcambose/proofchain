import Button from '@components/Button';
import FormikField from '@components/form/formik/Field';
import Form from '@components/form/formik/Form';
import validation from '@utils/validation';
import { FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';
import { EntityTypeEnum } from '@enums';
import { useState } from 'react';
import transactionWrapper from '@utils/transactionWrapper';
import proofchain from 'proofchain';
interface CreateEntityFormProps {
  // onSubmit: (email: string, password: string) => Promise<void>;
  isCertificateAuthority?: boolean;
  submitButtons: (isLoading: boolean) => React.ReactNode;
}
interface CreateEntityFormValues {
  name: string;
  entityType: string;
}
const options = [
  {
    label: 'Manufacturer',
    id: EntityTypeEnum.MANUFACTURER,
  },
  {
    label: 'Logistic entity',
    id: EntityTypeEnum.LOGISTIC,
  },
  {
    label: 'Warehouse',
    id: EntityTypeEnum.WAREHOUSE,
  },
  {
    label: 'Retailer',
    id: EntityTypeEnum.RETAILER,
  },
];
const _CreateEntityForm: React.FC<
  CreateEntityFormProps & FormikProps<CreateEntityFormValues>
> = (props) => {
  const { submitButtons, isSubmitting, values, isCertificateAuthority } = props;

  return (
    <Form>
      <FormikField label="Entity Name" name="name" />
      {!isCertificateAuthority && (
        <FormikField
          label="Entity type"
          name="entityType"
          type="select"
          options={options}
          valueKey="id"
          labelKey="label"
          clearable={false}
          searchable={false}
          value={values.entityType}
        />
      )}
      {submitButtons(isSubmitting)}
    </Form>
  );
};
const CreateEntityForm = withFormik<
  CreateEntityFormProps,
  CreateEntityFormValues
>({
  // Transform outer props into form values
  mapPropsToValues: () => {
    return {
      name: '',
      entityType: EntityTypeEnum.MANUFACTURER,
    };
  },

  // Add a custom validation function (this can be async too!)
  validationSchema: Yup.object().shape({
    name: validation.name,
  }),

  handleSubmit: async (values, { props }) => {
    const { name, entityType } = values;
    if (props.isCertificateAuthority) {
      // todo
    } else {
      await transactionWrapper(async () => {
        const result = await proofchain()
          .company()
          .create({ name, entityType: entityType as EntityTypeEnum });
        console.log(result);
      });
    }
    // await props.onSubmit(name, entityType);
  },
})(_CreateEntityForm);
export default CreateEntityForm;
