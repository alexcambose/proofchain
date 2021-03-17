import { FormControl } from 'baseui/form-control';
import { Select } from 'baseui/select';
import {
  Formik,
  FormikConfig,
  FormikValues,
  Form as FormikForm,
  useField,
} from 'formik';
import { debounce } from 'lodash';
import proofchain from 'proofchain';
import React, { useEffect, useState } from 'react';
import Field from './Field';
interface IMaterialsUuidInputProps {}
const MaterialsUuidInput: React.FC<IMaterialsUuidInputProps> = (props) => {
  const [{ value }, meta, { setValue }] = useField({ name: 'materialsUuid' });
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [materialTokenInfo, setMaterialTokenInfo] = useState(null);
  const getOptions = async () => {
    setIsLoading(true);
    setMaterialTokenInfo(null);
    const {
      materialTokenId,
      uuid,
    } = await proofchain().material.getMaterialByUuid(value[0].id);
    console.log(uuid);
    if (uuid !== value[0].id) {
      setMaterialTokenInfo(null);
      setOptions([]);
      setIsLoading(false);

      return;
    }
    const uuids = await proofchain().material.getOwnedMaterialsUuidCodes(
      materialTokenId
    );
    const m = await proofchain().material.getById(materialTokenId);
    setMaterialTokenInfo(m);
    setOptions(uuids.map((e) => ({ id: e, label: e + ' - ' + m.name })));
    setIsLoading(false);
  };
  useEffect(() => {
    console.log('current value', value);
    // getSuggestions(inputValue);
    if (value.length === 1 && options.length === 0) {
      getOptions();
    }
    if (value.length === 0) {
      setMaterialTokenInfo(null);
      setOptions([]);
    }
  }, [value]);
  return (
    <FormControl
      htmlFor={'materialsUuid'}
      label={'Materials uuid'}
      caption={
        materialTokenInfo ? (
          <strong>{materialTokenInfo.name}</strong>
        ) : (
          'The uuids of the materials you want to add to this batch'
        )
      }
      error={meta.touched ? meta.error : ''}
    >
      <Select
        id="materialsUuid"
        closeOnSelect={false}
        options={options}
        value={value}
        multi
        noResultsMsg={
          value.length === 0
            ? 'Please enter a uuid. The input will automatically find the available uuids of the same material id.'
            : isLoading
            ? 'Loading...'
            : 'This uuid does not exist'
        }
        autoFocus
        isLoading={isLoading}
        creatable={value.length === 0}
        placeholder="Enter a uuid"
        onChange={(params) => setValue(params.value)}
      />
    </FormControl>
  );
};

export default MaterialsUuidInput;
