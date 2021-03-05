import LoginChecker from '@components/auth/LoginChecker';
import { useDispatch } from 'react-redux';
import { logout } from 'store/user';
import web3Instance from '../web3';
import Cookies from 'cookies';
import { AuthManager } from '@utils/auth/authManager';

const Index = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div>{JSON.stringify(web3Instance)}</div>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </>
  );
};
export const authCheck = (expectLoggedIn) => ({ req, res }) => {
  const cookies = new Cookies(req, res);
  const loggedIn = new AuthManager(cookies).isLoggedIn();
  if (expectLoggedIn && !loggedIn) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  } else if (!expectLoggedIn && loggedIn) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  } else {
    return { props: {} };
  }
};
export const getServerSideProps = authCheck(true);

export default Index;
