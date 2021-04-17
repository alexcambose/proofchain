import Address from '@components/Address';
import Grid2 from '@components/layout/Grid2';
import VerticalTable from '@components/table/VerticalTable';
import CertificateTypeTag from '@components/tag/CertificareTypeTag';
import { fetchCertificateInfo } from '@store/certificate/actions';
import { State } from '@store/index';
import { Block } from 'baseui/block';
import { Skeleton } from 'baseui/skeleton';
import { Display4, Label1, Label2 } from 'baseui/typography';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CertificateTableCompanies from './components/table/CertificateTableCompanies';
import CertificateTableMaterials from './components/table/CertificateTableMaterials';

interface ICertificateInfoProps {
  certificateCode: number;
}
const CertificateInfo: React.FC<ICertificateInfoProps> = ({
  certificateCode,
}) => {
  const {
    certificate,
    materialAdditionalInfo,
    companyAdditionalInfo,
  } = useSelector((state: State) => state.certificate.certificateInfo);
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
      <Block padding="scale400" />
      <VerticalTable
        items={{
          Name: certificate.name,
          Description: certificate.description,
          Type: <CertificateTypeTag type={certificate.ctype} />,
          'Certificate authority address': (
            <Address>{certificate.certificateAuthority}</Address>
          ),
        }}
      />
      <Block padding="scale400" />

      <Display4>Assigned to:</Display4>
      <Grid2
        left={
          <>
            <Label2>Materials</Label2>
            <CertificateTableMaterials
              certificateCode={certificate.code}
              info={materialAdditionalInfo}
              isLoading={loadingCertificateInfo}
            />
          </>
        }
        right={
          <>
            <Label2>Companies</Label2>
            <CertificateTableCompanies
              certificateCode={certificate.code}
              info={companyAdditionalInfo}
              isLoading={loadingCertificateInfo}
            />
          </>
        }
      />
    </>
  );
};
export default CertificateInfo;
