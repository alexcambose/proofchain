import LoadingSkeleton from '@components/loading/LoadingSkeleton';
import { State } from '@store/index';
import { fetchMaterialInfoCertificates } from '@store/material/actions';
import { Label1 } from 'baseui/typography';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCertificatesTable from '../table/MaterialCertificatesTable';

interface IMaterialCertificatesPanelProps {
  materialTokenId: number;
}
const MaterialCertificatesPanel: React.FC<IMaterialCertificatesPanelProps> = ({
  materialTokenId,
}) => {
  const dispatch = useDispatch();
  const certificates = useSelector(
    (state: State) => state.material.materialInfo.certificates
  );
  useEffect(() => {
    dispatch(fetchMaterialInfoCertificates({ materialTokenId }));
  }, []);
  if (!certificates) {
    return <LoadingSkeleton />;
  }
  return (
    <>
      <Label1>Certificates - {certificates.length}</Label1>
      <MaterialCertificatesTable certificates={certificates} />
    </>
  );
};
export default MaterialCertificatesPanel;
