import Button from '@components/Button';
import Field from '@components/form/formik/Field';
import Form from '@components/form/formik/Form';
import { mintMaterial } from '@store/material/actions';
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

interface MintMaterialFormProps extends ReturnType<typeof mapDispatchToProps> {
  isRawMaterial?: boolean;
  materialTokenId: number;
  amountIdentifier?: string;
  onSuccess?: () => void;
}
interface FormValues {
  mintAmount: number;
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
const _MintMaterialForm: React.FC<
  MintMaterialFormProps & FormikProps<FormValues>
> = (props) => {
  // console.log(unitsOfMeasurement);
  const { isSubmitting, values, isRawMaterial, amountIdentifier } = props;
  return (
    <Form>
      <Field
        name="mintAmount"
        type="number"
        placeholder="Mint Amount"
        label="Mint Amount"
        caption="How many pieces of this material to create"
        endEnhancer={() => amountIdentifier}
      />
      {!isRawMaterial && (
        <FieldArray
          name="recipe"
          render={(arrayHelpers) => (
            <>
              {values.recipe.map((recipe, index) => (
                <RecipeButtons
                  key={index}
                  index={index}
                  arrayHelpers={arrayHelpers}
                />
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
        Mint
      </Button>
    </Form>
  );
};
const MintMaterialForm = withFormik<MintMaterialFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: () => {
    return {
      mintAmount: 1,
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
      mintAmount: validation.mintAmount,
      ...(!props.isRawMaterial ? { recipe: validation.recipe } : {}),
    }),
  handleSubmit: async (values, { props }) => {
    const { mintMaterial, onSuccess } = props;
    await mintMaterial({
      materialTokenId: props.materialTokenId,
      amount: values.mintAmount,
    });
    onSuccess && onSuccess();
  },
})(_MintMaterialForm);
const mapDispatchToProps = (dispatch) => {
  return {
    mintMaterial: (data) => dispatch(mintMaterial(data)),
  };
};
export default connect(null, mapDispatchToProps)(MintMaterialForm);
