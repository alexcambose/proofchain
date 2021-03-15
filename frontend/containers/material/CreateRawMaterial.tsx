import { useRouter } from 'next/router';
import CreateMaterialForm from './components/form/CreateMaterialForm';

const CreateRawMaterial = () => {
  const router = useRouter();
  const onSucess = () => {
    router.push('/raw-material');
  };
  return (
    <>
      <CreateMaterialForm isRawMaterial onSuccess={onSucess} />
    </>
  );
};
export default CreateRawMaterial;
