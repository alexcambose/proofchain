import LoadingSkeleton from '@components/loading/LoadingSkeleton';
import MaterialCertificatesTable from '@containers/material/components/table/MaterialCertificatesTable';
import {
  fetchCompanyInfo,
  fetchCompanyInfoCertificates,
} from '@store/client/actions';
import { State } from '@store/index';
import { IMaterial } from 'interface';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface IClientCompanyCertificatesProps {
  material: IMaterial;
}

const ClientCompanyCertificates: React.FunctionComponent<IClientCompanyCertificatesProps> = ({
  material,
}) => {
  const dispatch = useDispatch();
  const companyInfo = useSelector(
    (state: State) => state.client.information.companyInfo
  );
  useEffect(() => {
    dispatch(fetchCompanyInfoCertificates(material));
  }, []);
  if (!companyInfo.certificates) return <LoadingSkeleton />;
  return <MaterialCertificatesTable certificates={companyInfo.certificates} />;
};

export default ClientCompanyCertificates;
