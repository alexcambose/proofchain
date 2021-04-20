import { FormControl } from 'baseui/form-control';
import { SIZE, StyledSpinnerNext as Spinner } from 'baseui/spinner';
import { Input, SIZE as INPUT_SIZE } from 'baseui/input';
import { throttle } from 'lodash';
import proofchain from 'proofchain';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { StyledAction, StyledBody } from 'baseui/card';
import Button from '@components/Button';
import { IMaterial } from 'interface';
import { EMPTY_ADDRESS } from 'proofchain-library/src/utils/eth';
import { useRouter } from 'next/router';
import LoadingSkeleton from '@components/loading/LoadingSkeleton';
import { getMaterialById, getMaterialByUuid } from '@utils/cachable';
import Card from '@components/Card';
import { Label1 } from 'baseui/typography';

interface IProductCodeFormProps {}

const ProductCodeForm: React.FunctionComponent<IProductCodeFormProps> = (
  props
) => {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [materialFound, setMaterialFound] = useState<
    { uuid: string } & IMaterial
  >(null);
  // highlight-starts
  const searchProduct = useCallback(
    throttle(async (uuid) => {
      setLoading(true);
      setError('');
      setMaterialFound(null);

      if (!uuid) {
      } else if (uuid !== '0') {
        console.log('getting instance');
        const materialInstance = await getMaterialByUuid(uuid);
        console.log('got instance');
        const materialFromInstance = await getMaterialById(
          materialInstance.materialTokenId
        );
        console.log('finish', materialInstance, materialFromInstance);
        setMaterialFound({ ...materialFromInstance, uuid });
      } else {
        setError('Products codes start at 1');
      }
      setLoading(false);
    }, 2000),
    [] // will be created only once initially
  );
  useEffect(() => {
    searchProduct(value);
  }, [value]);
  return (
    <>
      <FormControl
        label="Product code"
        caption="Enter the product code to view details"
        error={error}
        htmlFor="code"
      >
        <Input
          id="code"
          value={value}
          size={INPUT_SIZE.large}
          autoFocus
          type="number"
          min={1}
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
      {loading && <LoadingSkeleton />}
      {materialFound && (
        <Card title={materialFound.name}>
          <StyledBody>
            <Label1>Uuid: {materialFound.uuid}</Label1>
          </StyledBody>
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
