import authManager from '@utils/auth/authManager';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { State } from 'store';

const LoginChecker = (loggedIn = false) => (Component) => () => {
  const router = useRouter();
  const isLoggedIn = useSelector((state: State) => state.user.loggedIn);
  const [finished, setFinished] = useState<boolean>(false);
  const check = () => {
    if (loggedIn && !isLoggedIn) {
      router.push('/login');
    }
    if (!loggedIn && isLoggedIn) {
      router.push('/');
    }
    setFinished(true);
  };
  useEffect(() => {
    check();
  }, [isLoggedIn]);
  useEffect(() => {
    check();
  }, []);
  if (!finished) return null;
  return <Component />;
};
export default LoginChecker;
