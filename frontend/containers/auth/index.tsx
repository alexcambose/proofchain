import { SocialLoginTypeEnum } from 'enums';
import { triggerLogin } from '@utils/auth/torus';
import AuthContainer from './components/AuthContainer';
import AuthForm from './components/AuthForm';
import SocialButtons from './components/SocialButtons';
import Web3 from 'web3';
import AuthMnemonic from './components/AuthMnemonic';
import { useDispatch } from 'react-redux';
import {
  loginWithMetamask,
  loginWithTorus,
  refreshBalance,
} from '@store/user/actions';
import { loginWithMnemonic } from '@store/user/actions';
import LogoSvg from '@assets/images/logo/proofchain-logo-full-dark.svg';
import { styled } from 'baseui';
const Logo = styled(LogoSvg, {
  width: '100%',
  height: '26%',
});
const Auth: React.FC = () => {
  const dispatch = useDispatch();
  const onSocialButtonsClick = async (loginType: SocialLoginTypeEnum) => {
    if (loginType === SocialLoginTypeEnum.METAMASK) {
      await dispatch(loginWithMetamask());
    } else {
      await dispatch(loginWithTorus(loginType));
    }
    await dispatch(refreshBalance());
  };
  const onFormSubmit = async (email, password) => {
    await triggerLogin(SocialLoginTypeEnum.EMAIL_PASSWORD, {
      email,
      password,
    });
  };
  const onMnemonicSubmit = async (mnemonic, derivationPath) => {
    await dispatch(loginWithMnemonic({ mnemonic, derivationPath }));
    await dispatch(refreshBalance());
  };
  return (
    <>
      <Logo />
      <AuthContainer
        formElement={<AuthForm onSubmit={onFormSubmit} />}
        socialLoginElement={<SocialButtons onClick={onSocialButtonsClick} />}
        mnemonicElement={<AuthMnemonic onSubmit={onMnemonicSubmit} />}
      ></AuthContainer>
    </>
  );
};

export default Auth;
