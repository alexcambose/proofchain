import { fetchCertificateInfo } from '@store/certificate/actions';
import { State } from '@store/index';
import { Skeleton } from 'baseui/skeleton';
import { Display4, Label1 } from 'baseui/typography';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CertificateTableMaterials from './components/table/CertificateTableMaterials';

interface ICertificateInfoProps {
  code: number;
}
const CertificateInfo: React.FC<ICertificateInfoProps> = ({ code }) => {
  const { certificate, additionalInfo } = useSelector(
    (state: State) => state.certificate.certificateInfo
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCertificateInfo({ code }));
  }, []);
  if (!certificate) {
    return <Skeleton rows={10} height="200px" width="100%" animation />;
  }
  return (
    <>
      <Display4>{certificate.name}</Display4>
      <Label1>{certificate.description}</Label1>
      <CertificateTableMaterials info={additionalInfo} />
    </>
  );
};
export default CertificateInfo;
