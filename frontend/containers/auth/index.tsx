import { SocialLoginTypeEnum } from '@types/enums';
import { triggerLogin } from '@utils/auth/torus';
import AuthContainer from './components/AuthContainer';
import AuthForm from './components/AuthForm';
import SocialButtons from './components/SocialButtons';
const Auth: React.FC = () => {
  const onSocialButtonsClick = (loginType: SocialLoginTypeEnum) => {
    console.log(loginType);
    return triggerLogin(loginType);
  };
  return (
    <AuthContainer
      formElement={<AuthForm />}
      socialLoginElement={<SocialButtons onClick={onSocialButtonsClick} />}
    ></AuthContainer>
  );
};

export default Auth;
