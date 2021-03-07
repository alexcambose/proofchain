import LoginChecker from '@components/auth/LoginChecker';
import { useDispatch } from 'react-redux';
import { logout, setLoggedIn } from 'store/user';
import web3Instance from '../web3Manager';
import Cookies from 'cookies';
import { AuthManager } from '@utils/auth/authManager';
import Layout from '@containers/Layout';
import { State, wrapper } from '../store';
import { useRouter } from 'next/router';
import { refreshLogin } from 'store/user/actions';

const Index = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <Layout>
      <a href="#" onClick={() => router.push('/products')}>
        Products
      </a>
      <button onClick={() => dispatch(logout())}>Logout</button>
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
