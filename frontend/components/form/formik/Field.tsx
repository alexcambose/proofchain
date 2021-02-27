import React from 'react';
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import { Input } from 'baseui/input';
import { FormControl } from 'baseui/form-control';

interface FormikFieldProps {
  name: string;
  type?: 'text' | 'password';
  label?: string;
  caption?: string;
  [key: string]: string;
}

const FormikField: React.FC<FormikFieldProps> = ({
  name,
  type = 'text',
  label,
  caption,
  ...props
}) => {
  return (
    <Field name={name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }) => (
        <FormControl
          htmlFor={name}
          label={label}
          caption={caption}
          error={meta.touched ? meta.error : ''}
        >
          <div>
            <Input
              name={name}
              id={name}
              error={meta.touched && meta.error}
              type={type}
              {...field}
            />
          </div>
        </FormControl>
      )}
    </Field>
  );
};

export default FormikField;
