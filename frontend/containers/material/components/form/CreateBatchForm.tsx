import Button from '@components/Button';
import Field from '@components/form/formik/Field';
import Form from '@components/form/formik/Form';
import { CreateBatch } from '@store/material/actions';
import validation from '@utils/validation';
import { Block } from 'baseui/block';
import { KIND } from 'baseui/button';
import { FormControl } from 'baseui/form-control';
import { Alert, Check, Delete, Plus } from 'baseui/icon';
import { BEHAVIOR, Cell, Grid } from 'baseui/layout-grid';
import { StatefulPopover, TRIGGER_TYPE } from 'baseui/popover';
import { Spinner } from 'baseui/spinner';
import { FieldArray, FormikProps, withFormik } from 'formik';
import { IMaterial } from 'interface';
import { debounce } from 'lodash';
import proofchain from 'proofchain';
import React, { useEffect, useState } from 'react';
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
  mapPropsToValues: () => {
    return {
      materialTokenId: null,
      materialTokenAmount: 1,
      code: '',
    };
  },
  validationSchema: yup.object().shape({
    mintAmount: validation.mintAmount,
    materialTokenAmount: validation.materialTokenAmount,
    code: validation.batchCode,
  }),
  handleSubmit: async (values, { props }) => {
    const { CreateBatch, onSuccess } = props;
    await CreateBatch(values);
    onSuccess && onSuccess();
  },
})(_CreateBatchForm);
const mapDispatchToProps = (dispatch) => {
  return {
    CreateBatch: (data) => dispatch(CreateBatch(data)),
  };
};
export default connect(null, mapDispatchToProps)(CreateBatchForm);
