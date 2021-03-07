import GuestNav from '@components/navigation/navbar/GuestNav';
import { useSelector } from 'react-redux';
import { State } from 'store';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const loggedIn = useSelector((state: State) => state.user.loggedIn);
  return (
    <>
      <GuestNav />
      {children}
    </>
  );
};

export default Layout;
