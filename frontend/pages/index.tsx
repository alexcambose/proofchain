import CreateEntityForm from '@containers/auth/components/entity/CreateEntityForm';
import Layout from '@containers/Layout';
import { logout, setLoggedIn } from '@store/user';
import { AuthManager } from '@utils/auth/authManager';
import Cookies from 'cookies';
import { useRouter } from 'next/router';
import proofchain, { initProofchain } from 'proofchain';
import { useDispatch } from 'react-redux';
import web3Instance from 'web3Instance';
import { wrapper } from '../store';

const Index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <Layout>
      <button onClick={() => console.log(proofchain(), web3Instance())}>
        a
      </button>
      <button onClick={() => proofchain().company().hasCompany()}>b</button>
      <CreateEntityForm />
    </Layout>
  );
};
export const authCheck = (expectLoggedIn) =>
  wrapper.getServerSideProps(async ({ store, req, res, ...other }) => {
    const cookies = new Cookies(req, res);
    const loggedIn = new AuthManager(cookies).isLoggedIn();

    if (loggedIn) {
      store.dispatch(setLoggedIn(true));
    }
    const onLoginPage = req.url == '/login';
    if (expectLoggedIn && !loggedIn && !onLoginPage) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    } else if (!expectLoggedIn && loggedIn && onLoginPage) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    } else {
      return { props: {} };
    }
  });
export const getServerSideProps = authCheck(true);

export default Index;
