import LoadingSkeleton from '@components/LoadingSkeleton';
import { State } from '@store/index';
import { fetchMaterialInfoCertificates } from '@store/material/actions';
import { Cell, Grid } from 'baseui/layout-grid';
import { Label1, H6 } from 'baseui/typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MintMaterialForm from '../form/MintMaterialForm';
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
      <MaterialCertificatesTable certficates={certificates} />
    </>
  );
};
export default MaterialCertificatesPanel;
