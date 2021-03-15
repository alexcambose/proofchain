import Button from '@components/Button';
import Field from '@components/form/formik/Field';
import Form from '@components/form/formik/Form';
import { createMaterial } from '@store/material/actions';
import { capitalizeFirstLetter } from '@utils/misc';
import { FormControl } from 'baseui/form-control';
import { BEHAVIOR, Cell, Grid } from 'baseui/layout-grid';
import { TYPE } from 'baseui/select';
import { FieldArray, FormikErrors, FormikProps, withFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { Spinner } from 'baseui/spinner';
import { Delete, Plus, Check, Alert } from 'baseui/icon';
import { debounce } from 'lodash';
import commonUnits from '../../../../data/commonUnits.json';
import { KIND } from 'baseui/button';
import validation from '@utils/validation';
import proofchain from 'proofchain';
import { Block } from 'baseui/block';
import { StatefulPopover, TRIGGER_TYPE } from 'baseui/popover';
import { IMaterial } from 'interface';

interface CreateMaterialFormProps
  extends ReturnType<typeof mapDispatchToProps> {
  isRawMaterial?: boolean;
  onSuccess?: () => void;
}
interface FormValues {
  name: string;
  code: string;
  amountIdentifier: any;
  recipe: [
    {
      materialTokenId: string;
      materialTokenAmount: number;
    }
  ];
}
const cellOverrideLeft = {
  Cell: {
    style: ({ $theme }) => ({
      paddingLeft: '0 !important',
    }),
  },
};
const cellOverrideRight = {
  Cell: {
    style: ({ $theme }) => ({
      paddingRight: '0 !important',
    }),
  },
};
const RecipeButtons = ({ index, arrayHelpers, ...props }) => {
  const {
    form: { values, touched, setFieldError },
  } = arrayHelpers;
  console.log(arrayHelpers.form);
  const [materialInfo, setMaterialInfo] = useState<IMaterial>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const getMaterialInfo = debounce(
    async (tokenId) => {
      if (!tokenId) return;
      setMaterialInfo(null);
      setIsLoading(true);
      setIsError(false);
      const fetchedMaterial = await proofchain().material.getById(tokenId);
      if (!fetchedMaterial) {
        setIsError(true);
        setFieldError(
          `recipe[${index}].materialTokenId`,
          `Material with id ${tokenId} does not exist`
        );
      }
      console.log(tokenId, fetchedMaterial);
      setMaterialInfo(fetchedMaterial);
      setIsLoading(false);
    },
    1000,
    { maxWait: 1000 }
  );
  useEffect(() => {
    getMaterialInfo(values.recipe[index].materialTokenId);
  }, [values.recipe[index]]);
  return (
    <Grid
      behavior={BEHAVIOR.fluid}
      overrides={{
        Grid: {
          style: ({ $theme }) => ({
            paddingLeft: '0 !important',
            paddingRight: '0 !important',
          }),
        },
      }}
    >
      <Cell overrides={cellOverrideLeft} span={[2, 4, 6]}>
        <Field
          label="Material Token Id"
          caption="The id of the required material"
          name={`recipe[${index}].materialTokenId`}
          // onBlur={() => getMaterialInfo(values.recipe[index].materialTokenId)}
          endEnhancer={() =>
            values.recipe[index].materialTokenId &&
            // touched.recipe[index].materialTokenId &&
            (isLoading ? (
              <Spinner size="20px" />
            ) : isError ? (
              <StatefulPopover
                content={() => (
                  <Block padding={'20px'}> Material does not exist!</Block>
                )}
                returnFocus
                autoFocus
                triggerType={TRIGGER_TYPE.hover}
              >
                <Alert color="red" />
              </StatefulPopover>
            ) : (
              <StatefulPopover
                content={() => (
                  <Block padding={'20px'}>{JSON.stringify(materialInfo)}</Block>
                )}
                returnFocus
                autoFocus
                triggerType={TRIGGER_TYPE.hover}
              >
                <Check />
              </StatefulPopover>
            ))
          }
        />
      </Cell>
      <Cell overrides={cellOverrideLeft} span={[1, 3, 4]}>
        <Field
          label="Amount"
          type="number"
          min="1"
          max="9999"
          step="1"
          caption="How many of these products are requied"
          name={`recipe[${index}].materialTokenAmount`}
          endEnhancer={materialInfo && materialInfo.amountIdentifier}
        />
      </Cell>
      <Cell overrides={cellOverrideRight} span={[1, 1, 2]}>
        <FormControl label="&nbsp;">
          <Button
            type="button"
            onClick={() => arrayHelpers.remove(index)}
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
        </FormControl>
      </Cell>
    </Grid>
  );
};
const unitsOfMeasurement = commonUnits.map((e, i) => ({
  label: capitalizeFirstLetter(e['Name']) + ' - ' + e['Symbol'],
  id: e['Symbol'],
}));
const _CreateMaterialForm: React.FC<
  CreateMaterialFormProps & FormikProps<FormValues>
> = (props) => {
  // console.log(unitsOfMeasurement);
  const { isSubmitting, values, isRawMaterial } = props;
  return (
    <Form>
      <Field
        name="name"
        type="text"
        placeholder="Material name"
        label="Material name"
        caption="Descriptive material name"
      />
      <Field
        name="code"
        type="text"
        placeholder="Material code"
        label="Material code"
        caption="Optional material identification code"
      />
      <Field
        label="Amount indentifier"
        caption="The identifier of one unit of this material. (eg: 1 liter of water)"
        name="amountIdentifier"
        type={'select'}
        options={unitsOfMeasurement}
        valueKey="id"
        labelKey="label"
        overrides={{
          Dropdown: {
            style: ({ $theme }) => ({ maxHeight: '22vh' }),
          },
        }}
      />
      {!isRawMaterial && (
        <FieldArray
          name="recipe"
          render={(arrayHelpers) => (
            <>
              {values.recipe.map((recipe, index) => (
                <RecipeButtons index={index} arrayHelpers={arrayHelpers} />
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
                onClick={() =>
                  arrayHelpers.push({
                    materialTokenAmount: 1,
                    materialTokenId: '',
                  })
                }
              >
                <Plus /> Add material
              </Button>
            </>
          )}
        />
      )}
      <Button isLoading={isSubmitting} disabled={isSubmitting} type="submit">
        Create material
      </Button>
    </Form>
  );
};
const CreateMaterialForm = withFormik<CreateMaterialFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: () => {
    return {
      name: '',
      code: '',
      amountIdentifier: 'kg',
      recipe: [
        {
          materialTokenAmount: 1,
          materialTokenId: '',
        },
      ],
    };
  },
  validationSchema: (props) =>
    yup.object().shape({
      name: validation.name,
      code: validation.code,
      amountIdentifier: validation.amountIdentifier,
      ...(!props.isRawMaterial ? { recipe: validation.recipe } : {}),
    }),
  handleSubmit: async (values, { props }) => {
    const { createMaterial, onSuccess } = props;
    await createMaterial(values);
    onSuccess && onSuccess();
  },
})(_CreateMaterialForm);
const mapDispatchToProps = (dispatch) => {
  return {
    createMaterial: (data) => dispatch(createMaterial(data)),
  };
};
export default connect(null, mapDispatchToProps)(CreateMaterialForm);
