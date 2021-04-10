import * as React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import Form, { FormSuccess } from '@components/form/Form';
import ContainerSmall from '@components/layout/ContainerSmall';
import Input from '@components/form/Input';
import Button from '@components/button/Button';

interface IContactFormProps {}

const ContactForm: React.FunctionComponent<IContactFormProps> = (props) => {
  const [state, handleSubmit] = useForm('mgererev');
  if (state.succeeded) {
    return (
      <FormSuccess>
        Thank you for your message! We will respond shortly. :)
      </FormSuccess>
    );
  }
  return (
    <ContainerSmall>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="Your email"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <Input
          type="textarea"
          name="message"
          label="Message"
          placeholder="Your Message"
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
        <Button type="submit" disabled={state.submitting}>
          {state.submitting ? 'Sending...' : 'Submit'}
        </Button>
      </Form>
    </ContainerSmall>
  );
};

export default ContactForm;
