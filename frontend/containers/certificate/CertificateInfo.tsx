import { fetchCertificateInfo } from '@store/certificate/actions';
import { State } from '@store/index';
import { Skeleton } from 'baseui/skeleton';
import { Display4, Label1 } from 'baseui/typography';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CertificateTableMaterials from './components/table/CertificateTableMaterials';

interface ICertificateInfoProps {
  certificateCode: number;
}
const CertificateInfo: React.FC<ICertificateInfoProps> = ({
  certificateCode,
}) => {
  const { certificate, additionalInfo } = useSelector(
    (state: State) => state.certificate.certificateInfo
  );
  const loadingCertificateInfo = useSelector(
    (state: State) => state.certificate.loadingCertificateInfo
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCertificateInfo({ certificateCode }));
  }, []);
  if (!certificate) {
    return <Skeleton rows={10} height="200px" width="100%" animation />;
  }
  return (
    <>
      <Display4>{certificate.name}</Display4>
      <Label1>{certificate.description}</Label1>
      <CertificateTableMaterials
        certificateCode={certificate.code}
        info={additionalInfo}
        isLoading={loadingCertificateInfo}
      />
    </>
  );
};
export default CertificateInfo;
