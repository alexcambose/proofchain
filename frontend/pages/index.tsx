import LoginChecker from '@components/auth/LoginChecker';
import { useDispatch } from 'react-redux';
import { logout } from 'store/user';
import web3Instance from '../web3';
const Index = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div>{JSON.stringify(web3Instance)}</div>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </>
  );
};
export default LoginChecker(true)(Index);
