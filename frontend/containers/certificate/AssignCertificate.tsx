import { State } from '@store/index';
import { fetchMinimumStake } from '@store/certificate/actions';
import { stat } from 'fs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AssignCertificateForm from './components/form/AssignCertificateForm';

const AssignCertificate = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const minimumStake = useSelector(
    (state: State) => state.certificate.minimumStake
  );
  useEffect(() => {
    dispatch(fetchMinimumStake());
  }, []);
  const onSucess = () => {
    router.push('/certificate');
  };
  return (
    <>
      <AssignCertificateForm minimumStake={minimumStake} onSuccess={onSucess} />
    </>
  );
};
export default AssignCertificate;
