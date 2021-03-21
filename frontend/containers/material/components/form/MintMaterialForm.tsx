import uuid from 'react-uuid';
import Button from '@components/Button';
import Field from '@components/form/formik/Field';
import Form from '@components/form/formik/Form';
import FieldArrayGrid from '@components/layout/FieldArrayGrid';
import Grid2 from '@components/layout/Grid2';
import { fetchMaterialInfo, mintMaterial } from '@store/material/actions';
import validation from '@utils/validation';
import { KIND } from 'baseui/button';
import { FormControl } from 'baseui/form-control';
import { Delete, Plus } from 'baseui/icon';
import { Input } from 'baseui/input';
import { BEHAVIOR, Cell, Grid } from 'baseui/layout-grid';
import { Select } from 'baseui/select';
import { Skeleton } from 'baseui/skeleton';
import { Label1 } from 'baseui/typography';
import { FieldArray, FormikProps, withFormik } from 'formik';
import { IBatch, IMaterial } from 'interface';
import { throttle } from 'lodash';
import proofchain from 'proofchain';
import React, { useCallback, useEffect, useState } from 'react';
import { batch, connect } from 'react-redux';
import * as yup from 'yup';

interface MintMaterialFormProps extends ReturnType<typeof mapDispatchToProps> {
  materialTokenId: number;
  onSuccess?: () => void;
}
interface FormValues {
  amount: number;
  fromBatchId: number[];
  batchMaterialsUuid: number[][];
}

const RecipeButtons = ({ index, ...props }) => {
  const {
    isSubmitting,
    values,
    materialTokenId,
    setFieldValue,
    setFieldError,
    errors,
  } = props;

  const [batchInfo, setBatchInfo] = useState<IBatch>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const getBatchInfo = useCallback(
    throttle(async (batchId, index) => {
      setIsLoading(true);
      const batch = (await proofchain().batch.getById(batchId)) as IBatch;
      if (!batch) {
        setFieldError(`fromBatchId[${index}]`, 'This batch does not exist');
        console.log(`fromBatchId[${index}]`, 'This batch does not exist');
      }
      setBatchInfo(batch);
      setIsLoading(false);
    }, 1000),
    []
  );
  useEffect(() => {
    const batchId = values.fromBatchId[index];
    if (batchId) {
      getBatchInfo(batchId, index);
    }
  }, [values.fromBatchId[index], index]);
  return (
    <FieldArrayGrid
      colsContent={[
        <FormControl
          label="Batch Id"
          caption="The batch id that contains materials"
          error={errors.fromBatchId && errors.fromBatchId[index]}
        >
          <Input
            name={`fromBatchId[${index}]`}
            value={values.fromBatchId[index]}
            placeholder="Batch id"
            onChange={(e) => {
              // @ts-ignore
              setFieldValue(`fromBatchId[${index}]`, e.target.value);
            }}
            error={errors.fromBatchId && errors.fromBatchId[index]}
            onBlur={() => {}}
          />
        </FormControl>,
        <FormControl
          htmlFor={'batchMaterialsUuid'}
          label={'Materials uuid'}
          caption={
            'Materials uuid from the batch that will be used to mint this material.'
          }
        >
          <Select
            id="batchMaterialsUuid"
            closeOnSelect={false}
            disabled={!batchInfo}
            options={
              batchInfo &&
              batchInfo.materialsUuid.map((e) => ({
                id: e,
                label: e,
              }))
            }
            value={values.batchMaterialsUuid[index].map((e) => ({
              id: e,
              label: e,
            }))}
            multi
            autoFocus
            isLoading={isLoading}
            placeholder="Materials uuid"
            onChange={(params) =>
              setFieldValue(
                `batchMaterialsUuid[${index}]`,
                params.value.map((e) => e.id)
              )
            }
          />
        </FormControl>,
        <FormControl label="&nbsp;">
          <Button
            type="button"
            onClick={() => {
              setFieldValue('fromBatchId', values.fromBatchId.splice(index, 1));
              setFieldValue(
                'batchMaterialsUuid',
                values.batchMaterialsUuid.splice(index, 1)
              );
            }}
            disabled={index === 0}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: '100%',
                  marginTop: 0,
                }),
              },
            }}
          >
            <Delete size={20} />
          </Button>
        </FormControl>,
      ]}
    />
  );
};
const _MintMaterialForm: React.FC<
  MintMaterialFormProps & FormikProps<FormValues>
> = (props) => {
  // console.log(unitsOfMeasurement);
  const { isSubmitting, values, materialTokenId, setFieldValue } = props;
  const [material, setMaterial] = useState<IMaterial>(null);
  const [recipeMaterials, setRecipeMaterials] = useState<IMaterial[]>([]);

  useEffect(() => {
    (async () => {
      const material = await proofchain().material.getById(materialTokenId);
      if (material.recipeMaterialAmount.length !== 0) {
        const recipeMaterials = await Promise.all(
          material.recipeMaterialTokenId.map(
            async (id) => await proofchain().material.getById(id)
          )
        );
        setRecipeMaterials(recipeMaterials);
      }
      setMaterial(material);
    })();
  }, []);
  if (!material) {
    return (
      <Grid2
        right={<Skeleton rows={2} width="200px" animation />}
        left={<Skeleton rows={2} width="200px" animation />}
      />
    );
  }
  console.log(values);
  const isRawMaterial = material.recipeMaterialAmount.length === 0;
  return (
    <Form>
      {isRawMaterial && (
        <Field
          name="amount"
          type="number"
          placeholder="Mint Amount"
          label="Mint Amount"
          caption="How many pieces of this material to create"
          endEnhancer={() => material.amountIdentifier}
        />
      )}
      {!isRawMaterial && (
        <>
          {values.fromBatchId.map((recipe, index) => (
            <>
              <RecipeButtons key={uuid()} index={index} {...props} />
            </>
          ))}
          <Button
            kind={KIND.secondary}
            type="button"
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: 'auto',
                }),
              },
            }}
            disabled={
              values.batchMaterialsUuid[values.batchMaterialsUuid.length - 1]
                ?.length === 0 && values.fromBatchId.length > 0
            }
            onClick={() => {
              setFieldValue('batchMaterialsUuid', [
                ...values.batchMaterialsUuid,
                [],
              ]);
              setFieldValue('fromBatchId', [...values.fromBatchId, null]);
            }}
          >
            <Plus /> Add batch
          </Button>
        </>
      )}
      <Button isLoading={isSubmitting} disabled={isSubmitting} type="submit">
        {isRawMaterial ? 'Mint' : 'Mint 1 ' + material.name}
      </Button>
    </Form>
  );
};
const MintMaterialForm = withFormik<MintMaterialFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: () => {
    return {
      amount: 1,
      fromBatchId: [null],
      batchMaterialsUuid: [[]],
    };
  },
  validationSchema: (props) =>
    yup.object().shape({
      amount: validation.mintAmount,
    }),
  handleSubmit: async (values, { props, resetForm }) => {
    const {
      mintMaterial,
      materialTokenId,
      onSuccess,
      fetchMaterialInfo,
    } = props;
    console.log(values);
    await mintMaterial({
      materialTokenId,
      ...values,
    });
    await fetchMaterialInfo({ materialTokenId });
    resetForm();
    onSuccess && onSuccess();
  },
})(_MintMaterialForm);
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMaterialInfo: (data) => dispatch(fetchMaterialInfo(data)),
    mintMaterial: (data) => dispatch(mintMaterial(data)),
  };
};
export default connect(null, mapDispatchToProps)(MintMaterialForm);
