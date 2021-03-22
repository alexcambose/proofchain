import { useRouter } from 'next/router';
import CreateCertificateForm from './components/form/CreateCertificateForm';

const CreateCertificate = () => {
  const router = useRouter();
  const onSucess = () => {
    router.push('/certificate');
  };
  return (
    <>
      <CreateCertificateForm onSuccess={onSucess} />
    </>
  );
};
export default CreateCertificate;
