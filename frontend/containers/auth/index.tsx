import { SocialLoginTypeEnum } from '@types/enums';
import { triggerLogin } from '@utils/auth/torus';
import AuthContainer from './components/AuthContainer';
import AuthForm from './components/AuthForm';
import SocialButtons from './components/SocialButtons';
import web3 from 'web3';
import Web3 from 'web3';
import AuthMnemonic from './components/AuthMnemonic';
const Auth: React.FC = () => {
  const onSocialButtonsClick = async (loginType: SocialLoginTypeEnum) => {
    if (loginType === SocialLoginTypeEnum.METAMASK) {
      window.web3 = new Web3(window.ethereum);
      await ethereum.send('eth_requestAccounts');
      return;
    }
    return await triggerLogin(loginType);
  };
  const onFormSubmit = async (email, password) => {
    return await triggerLogin(SocialLoginTypeEnum.EMAIL_PASSWORD, {
      email,
      password,
    });
  };
  return (
    <AuthContainer
      formElement={<AuthForm onSubmit={onFormSubmit} />}
      socialLoginElement={<SocialButtons onClick={onSocialButtonsClick} />}
      mnemonicElement={<AuthMnemonic />}
    ></AuthContainer>
  );
};

export default Auth;
