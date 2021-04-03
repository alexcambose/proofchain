import { FormControl } from 'baseui/form-control';
import { SIZE, StyledSpinnerNext as Spinner } from 'baseui/spinner';
import { Input, SIZE as INPUT_SIZE } from 'baseui/input';
import { throttle } from 'lodash';
import proofchain from 'proofchain';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Card, StyledAction, StyledBody } from 'baseui/card';
import Button from '@components/Button';
import { IMaterial } from 'interface';
import { EMPTY_ADDRESS } from 'proofchain-library/src/utils/eth';
import { useRouter } from 'next/router';

interface IProductCodeFormProps {}

const ProductCodeForm: React.FunctionComponent<IProductCodeFormProps> = (
  props
) => {
  const router = useRouter();
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const [materialFound, setMaterialFound] = useState<
    { uuid: string } & IMaterial
  >(null);
  const searchProduct = throttle(async (uuid) => {
    setLoading(true);
    if (uuid) {
      const materialInstance = await proofchain().material.getMaterialByUuid(
        uuid
      );

      const materialFromInstance = await proofchain().material.getById(
        materialInstance.materialTokenId
      );
      setMaterialFound({ ...materialFromInstance, uuid });
    }
    setLoading(false);
  }, 1000);
  useEffect(() => {
    searchProduct(value);
  }, [value]);
  return (
    <>
      <FormControl
        label="Product code"
        caption="Enter the product code to view details"
        htmlFor="code"
      >
        <Input
          id="code"
          value={value}
          size={INPUT_SIZE.large}
          autoFocus
          type="number"
          min={0}
          step={1}
          endEnhancer={() => loading && <Spinner $size={SIZE.small} />}
          onChange={(e) =>
            // @ts-ignore
            setValue(e.target.value)
          }
          placeholder="Code"
          clearOnEscape
        />
      </FormControl>
      {materialFound && (
        <Card title={materialFound.name}>
          {/* <StyledBody>{materialFound.name}</StyledBody> */}
          <StyledAction>
            <Button
              onClick={() => {
                router.push('/client/' + materialFound.uuid);
              }}
            >
              View
            </Button>
          </StyledAction>
        </Card>
      )}
    </>
  );
};

export default ProductCodeForm;
