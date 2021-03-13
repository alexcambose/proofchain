import FormikField from '@components/form/formik/Field';
import Form from '@components/form/formik/Form';
import { CompanyEntityTypeEnum } from '@enums';
import { refreshLogin } from '@store/user/actions';
import transactionWrapper from '@utils/transactionWrapper';
import validation from '@utils/validation';
import { FormikProps, withFormik } from 'formik';
import proofchain from 'proofchain';
import { connect } from 'react-redux';
import * as Yup from 'yup';

interface CreateEntityFormProps extends ReturnType<typeof mapDispatchToProps> {
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
    id: CompanyEntityTypeEnum.MANUFACTURER,
  },
  {
    label: 'Logistic entity',
    id: CompanyEntityTypeEnum.LOGISTIC,
  },
  {
    label: 'Warehouse',
    id: CompanyEntityTypeEnum.WAREHOUSE,
  },
  {
    label: 'Retailer',
    id: CompanyEntityTypeEnum.RETAILER,
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
      entityType: CompanyEntityTypeEnum.MANUFACTURER,
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
        console.log(proofchain());
        const result = await proofchain().company.create({
          name,
          entityType: entityType as CompanyEntityTypeEnum,
        });
        console.log(result);
      });
    }
    await props.refreshLogin();
  },
})(_CreateEntityForm);
const mapDispatchToProps = (dispatch) => {
  return {
    refreshLogin: () => dispatch(refreshLogin()),
  };
};
export default connect(null, mapDispatchToProps)(CreateEntityForm);
