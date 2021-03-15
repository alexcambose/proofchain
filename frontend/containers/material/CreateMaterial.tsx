import { useRouter } from 'next/router';
import CreateMaterialForm from './components/form/CreateMaterialForm';

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
