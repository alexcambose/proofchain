import { SocialLoginTypeEnum } from '@types/enums';
import { triggerLogin } from '@utils/auth/torus';
import AuthContainer from './components/AuthContainer';
import AuthForm from './components/AuthForm';
import SocialButtons from './components/SocialButtons';
import web3 from 'web3';
import Web3 from 'web3';
const Auth: React.FC = () => {
  const onSocialButtonsClick = async (loginType: SocialLoginTypeEnum) => {
    let web3;
    window.web3 = new Web3(window.ethereum);
    await ethereum.send('eth_requestAccounts');
    // return await triggerLogin(loginType);
  };
  return (
    <AuthContainer
      formElement={<AuthForm />}
      socialLoginElement={<SocialButtons onClick={onSocialButtonsClick} />}
      mnemonicElement={null}
      metamaskElement={null}
    ></AuthContainer>
  );
};

export default Auth;
