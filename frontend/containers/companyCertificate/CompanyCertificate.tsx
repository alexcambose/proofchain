import { State } from '@store/index';
import {
  fetchCertificates,
  fetchCompanyCertificates,
} from '@store/certificate/actions';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CertificatesTable from './components/view/CertificatesTable';
import { useEffect } from 'react';

interface ICompanyCertificateProps {}

const CompanyCertificate: React.FunctionComponent<ICompanyCertificateProps> = (
  props
) => {
  const dispatch = useDispatch();
  const certificates = useSelector(
    (state: State) => state.certificate.companyCertificates
  );
  const loadingCertificates = useSelector(
    (state: State) => state.certificate.loadingCertificates
  );
  useEffect(() => {
    dispatch(fetchCompanyCertificates());
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

export default CompanyCertificate;
