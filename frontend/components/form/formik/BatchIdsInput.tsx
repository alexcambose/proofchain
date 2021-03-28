import { FormControl } from 'baseui/form-control';
import { Select } from 'baseui/select';
import { useField } from 'formik';
import proofchain from 'proofchain';
import React, { useEffect, useState } from 'react';
interface IBatchIdsInputProps {}
const BatchIdsInput: React.FC<IBatchIdsInputProps> = (props) => {
  const [{ value }, meta, { setValue }] = useField({ name: 'batchIds' });
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    (async () => {
      const batchIds = await proofchain().batch.allBatchIds();
      setOptions(batchIds.map((e) => ({ id: e, label: e })));
    })();
  }, []);
  const onChange = (v) => {
    setValue(v.map((e) => e.id));
  };
  return (
    <FormControl
      htmlFor={'batchIds'}
      label={'Batch ids'}
      caption={'The batch ids you want to send'}
      error={meta.touched ? meta.error : ''}
    >
      <Select
        id="batchIds"
        closeOnSelect={false}
        options={options}
        value={value.map((v) => ({ id: v, label: v }))}
        multi
        autoFocus
        isLoading={isLoading}
        placeholder="Enter batch ids"
        onChange={(params) => onChange(params.value)}
      />
    </FormControl>
  );
};

export default BatchIdsInput;
