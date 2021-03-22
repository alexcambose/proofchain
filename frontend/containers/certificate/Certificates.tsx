import { State } from '@store/index';
import { fetchCertificates } from '@store/certificate/actions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CertificatesTable from './components/table/CertificatesTable';

const Certificates = () => {
  const dispatch = useDispatch();
  const certificates = useSelector(
    (state: State) => state.certificate.certificates
  );
  const loadingCertificates = useSelector(
    (state: State) => state.certificate.loadingCertificates
  );
  useEffect(() => {
    dispatch(fetchCertificates());
  }, []);
  return (
    <>
      <CertificatesTable
        isLoading={loadingCertificates}
        certificates={certificates}
      />
    </>
  );
};
export default Certificates;
