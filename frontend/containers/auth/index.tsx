import AuthContainer from './components/AuthContainer';
import AuthForm from './components/AuthForm';
const Auth: React.FC = () => {
  return <AuthContainer formElement={<AuthForm />}></AuthContainer>;
};

export default Auth;
