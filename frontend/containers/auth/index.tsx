import { SocialLoginTypeEnum } from 'enums';
import { triggerLogin } from '@utils/auth/torus';
import AuthContainer from './components/AuthContainer';
import AuthForm from './components/AuthForm';
import SocialButtons from './components/SocialButtons';
import Web3 from 'web3';
import AuthMnemonic from './components/AuthMnemonic';
import { useDispatch } from 'react-redux';
import { loginWithMetamask, loginWithTorus } from '@store/user/actions';
import { loginWithMnemonic } from '@store/user/actions';

const Auth: React.FC = () => {
  const dispatch = useDispatch();
  const onSocialButtonsClick = async (loginType: SocialLoginTypeEnum) => {
    if (loginType === SocialLoginTypeEnum.METAMASK) {
      await dispatch(loginWithMetamask());
    } else {
      await dispatch(loginWithTorus(loginType));
    }
  };
  const onFormSubmit = async (email, password) => {
    await triggerLogin(SocialLoginTypeEnum.EMAIL_PASSWORD, {
      email,
      password,
    });
  };
  const onMnemonicSubmit = async (menmonic) => {
    await dispatch(loginWithMnemonic(menmonic));
  };
  return (
    <AuthContainer
      formElement={<AuthForm onSubmit={onFormSubmit} />}
      socialLoginElement={<SocialButtons onClick={onSocialButtonsClick} />}
      mnemonicElement={<AuthMnemonic onSubmit={onMnemonicSubmit} />}
    ></AuthContainer>
  );
};

export default Auth;
