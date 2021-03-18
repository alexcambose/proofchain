import { useRouter } from 'next/router';
import CreateTransportForm from './components/form/CreateTransportForm';

const CreateTransport = () => {
  const router = useRouter();
  const onSucess = () => {
    router.push('/transport');
  };
  return (
    <>
      <CreateTransportForm onSuccess={onSucess} />
    </>
  );
};
export default CreateTransport;
