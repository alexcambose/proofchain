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

interface IProductCodeFormProps {}

const ProductCodeForm: React.FunctionComponent<IProductCodeFormProps> = (
  props
) => {
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const [materialFound, setMaterialFound] = useState<IMaterial>(null);
  const searchProduct = throttle(async (uuid) => {
    setLoading(true);
    if (uuid) {
      const { materialTokenId } = await proofchain().material.getMaterialByUuid(
        uuid
      );
      const material = await proofchain().material.getById(materialTokenId);
      // @ts-ignore
      if (material.uuid != '0') {
        setMaterialFound(material);
      }
      console.log(material);
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
          type="text"
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
            <Button href={'/client/' + value}>View</Button>
          </StyledAction>
        </Card>
      )}
    </>
  );
};

export default ProductCodeForm;
