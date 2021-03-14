import { useRouter } from 'next/router';
import CreateMaterialForm from './components/CreateMaterialForm';

const CreateMaterial = () => {
  const router = useRouter();
  const onSucess = () => {
    router.push('/material');
  };
  return (
    <>
      <CreateMaterialForm onSuccess={onSucess} />
    </>
  );
};
export default CreateMaterial;
