import Container from '@components/layout/Container';
import * as React from 'react';
import {
  ContactContainer,
  ContactSubtitle,
  ContactTitle,
} from './Contact.styled';
import ContactForm from './ContactForm';

interface IContactProps {}

const Contact: React.FunctionComponent<IContactProps> = (props) => {
  return (
    <ContactContainer id="contact">
      <Container>
        <ContactTitle>Contact</ContactTitle>
        <ContactSubtitle>Let's do good together!</ContactSubtitle>
        <ContactForm />
      </Container>
    </ContactContainer>
  );
};

export default Contact;
