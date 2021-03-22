import React from 'react';
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import { Input } from 'baseui/input';
import { FormControl } from 'baseui/form-control';
import { Select, TYPE } from 'baseui/select';
import { Textarea } from 'baseui/textarea';
import { Checkbox } from 'baseui/checkbox';
interface FormikFieldProps {
  name: string;
  type?:
    | 'text'
    | 'number'
    | 'password'
    | 'textarea'
    | 'checkbox'
    | 'select'
    | TYPE['search'];
  label?: string;
  formControl?: boolean;

  caption?: React.ReactNode;
  [key: string]: any;
}
const InputMode = {
  text: 'text',
  number: 'numeric',
};
const FieldSwitch = React.forwardRef<HTMLButtonElement, any>(
  ({ type, children, form, helpers, ...props }, ref) => {
    if (!props.value && props.value != '0') {
      props.value = '';
    }
    props.ref = ref;
    props.inputMode = InputMode[type] || InputMode.text;
    switch (type) {
      case 'password':
        return (
          <>
            {children}
            <Input type={type} value={props.value} {...props} />
          </>
        );
      case 'select':
        return (
          <>
            {children}

            <Select
              {...props}
              onChange={({ option, ...rest }) => {
                form.setFieldValue(props.name, option.id);
              }}
              value={[props.options.find((e) => e.id === props.value)]}
            />
          </>
        );
      case TYPE.search:
        return (
          <>
            {children}

            <Select
              type={TYPE.search}
              {...props}
              onChange={({ option, ...rest }) => {
                form.setFieldValue(props.name, option.id);
              }}
              value={[props.options.find((e) => e.id === props.value)]}
            />
          </>
        );
      case 'textarea':
        return (
          <>
            {children}
            <Textarea {...props} />
          </>
        );
      case 'checkbox':
        return (
          <Checkbox
            {...props}
            checked={props.value}
            onChange={(e) =>
              props.onChange({
                ...e,
                value: (e.target as HTMLInputElement).checked,
              })
            }
          >
            {children}
          </Checkbox>
        );
      // case 'pincode':
      //   return (
      //     <PinCode
      //       onChange={(e) => {
      //         helpers.setValue(e.target.value);
      //       }}
      //     />
      //   );
      case 'number':
        return (
          <>
            {children}
            <Input type={type} value={props.value} {...props} />
          </>
        );
      default:
        return (
          <>
            {children}
            <Input type={type} value={props.value} {...props} />
          </>
        );
    }
  }
);
const FormikField: React.FC<FormikFieldProps> = ({
  name,
  type = 'text',
  label,
  caption,
  formControl = true,
  ...props
}) =>
  // ref
  {
    return (
      <Field name={name}>
        {({
          field, // { name, value, onChange, onBlur }
          form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }) => {
          const content = (
            <FieldSwitch
              name={name}
              id={name}
              error={meta.touched && meta.error}
              type={type}
              form={form}
              {...field}
              {...props}
              // ref={ref}
            >
              {formControl ? undefined : label}
            </FieldSwitch>
          );
          if (formControl) {
            return (
              <FormControl
                htmlFor={name}
                label={label}
                caption={caption}
                error={meta.touched ? meta.error : ''}
              >
                {content}
              </FormControl>
            );
          }
          return content;
        }}
      </Field>
    );
  };

export default FormikField;
