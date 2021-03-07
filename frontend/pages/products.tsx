import Layout from '@containers/Layout';
import { authCheck } from 'pages';
import { useDispatch } from 'react-redux';

const Index = () => {
  const dispatch = useDispatch();

  return <Layout>aaa </Layout>;
};
export const getServerSideProps = authCheck(true);

export default Index;
