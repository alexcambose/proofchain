import { useRouter } from 'next/router';
import CreateMaterialForm from './components/CreateMaterialForm';

const CreateRawMaterial = () => {
  const router = useRouter();
  const onSucess = () => {
    router.push('/raw-material');
  };
  return (
    <>
      <CreateMaterialForm onSuccess={onSucess} isRawMaterial={true} />
    </>
  );
};
export default CreateRawMaterial;
