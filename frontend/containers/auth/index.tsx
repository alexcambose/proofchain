import { SocialLoginTypeEnum } from '@types/enums';
import AuthContainer from './components/AuthContainer';
import AuthForm from './components/AuthForm';
import SocialButtons from './components/SocialButtons';
const Auth: React.FC = () => {
  const onSocialButtonsClick = async (loginType: SocialLoginTypeEnum) => {
    console.log(loginType);
  };
  return (
    <AuthContainer
      formElement={<AuthForm />}
      socialLoginElement={<SocialButtons onClick={onSocialButtonsClick} />}
    ></AuthContainer>
  );
};

export default Auth;
