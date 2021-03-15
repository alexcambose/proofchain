import { useRouter } from 'next/router';
import CreateBatchForm from './components/form/CreateBatchForm';

const CreateBatch = () => {
  const router = useRouter();
  const onSucess = () => {
    router.push('/batch');
  };
  return (
    <>
      <CreateBatchForm onSuccess={onSucess} />
    </>
  );
};
export default CreateBatch;
