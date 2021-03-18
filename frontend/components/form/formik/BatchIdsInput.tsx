import { FormControl } from 'baseui/form-control';
import { Select } from 'baseui/select';
import { useField } from 'formik';
import React, { useEffect, useState } from 'react';
interface IBatchIdsInputProps {}
const BatchIdsInput: React.FC<IBatchIdsInputProps> = (props) => {
  const [{ value }, meta, { setValue }] = useField({ name: 'batchIds' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, [value]);
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
        id="materialsUuid"
        closeOnSelect={false}
        value={value.map((v) => ({ id: v, label: v }))}
        multi
        autoFocus
        isLoading={isLoading}
        creatable={value.length === 0}
        placeholder="Enter batch ids"
        onChange={(params) => onChange(params.value)}
      />
    </FormControl>
  );
};

export default BatchIdsInput;
