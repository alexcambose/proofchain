import Address from '@components/Address';
import Grid2 from '@components/layout/Grid2';
import VerticalTable from '@components/table/VerticalTable';
import CertificateTypeTag from '@components/tag/CertificareTypeTag';
import TimeIndicator from '@components/TimeIndicator';
import CertificateAssignmentDetailsTable from '@containers/certificate/components/table/CertificateAssignmentDetailsTable';
import CertificateAssignmentHistory from '@containers/certificate/components/table/CertificateAssignmentHistory';
import CertificateTableCompanies from '@containers/certificate/components/table/CertificateTableCompanies';
import certificate from '@store/certificate';
import { State } from '@store/index';
import { Block } from 'baseui/block';
import { Skeleton } from 'baseui/skeleton';
import { Display4, Label1, Label2 } from 'baseui/typography';
import proofchain from 'proofchain';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface ICompanyCertificateInfoProps {
  certificateCode: number;
}
const CompanyCertificateInfo: React.FC<ICompanyCertificateInfoProps> = ({
  certificateCode,
}) => {
  const companyAddress = useSelector((state: State) => state.user.address);
  const [certificateInfo, setCertificateInfo] = useState(null);
  useEffect(() => {
    (async () => {
      const certificateCreateEvent = (
        await proofchain().certificateAuthority.getPastEvents(
          'CertificateAuthorityCertificateCreated',
          { code: certificateCode },
          true
        )
      )[0];
      const certificate = await proofchain().certificateAuthority.getByCode(
        certificateCode
      );
      const certificateAuthority = await proofchain().certificateAuthority.getCertificateAuthority(
        certificate.certificateAuthority
      );
      setCertificateInfo({
        certificate,
        certificateAuthority,
        certificateCreateEvent,
      });
    })();
  }, []);
  console.log(certificateInfo);
  if (!certificateInfo) {
    return <Skeleton rows={10} height="200px" width="100%" animation />;
  }
  return (
    <>
      <Display4>{certificateInfo.certificate.name}</Display4>
      <Block padding="scale400" />

      <Grid2
        left={
          <>
            <Label1>Information</Label1>
            <VerticalTable
              items={{
                Name: certificateInfo.certificate.name,
                Description: certificateInfo.certificate.description,
                Type: (
                  <CertificateTypeTag
                    type={certificateInfo.certificate.ctype}
                  />
                ),
                'Certificate authority name':
                  certificateInfo.certificateAuthority.name,

                'Certificate authority address': (
                  <Address>
                    {certificateInfo.certificate.certificateAuthority}
                  </Address>
                ),
                'Certificate created': (
                  <TimeIndicator>
                    {certificateInfo.certificateCreateEvent.block.timestamp}
                  </TimeIndicator>
                ),
              }}
            />
          </>
        }
        right={
          <>
            <Label1>History</Label1>
            <CertificateAssignmentHistory
              certificateCode={certificateCode}
              companyAddress={companyAddress}
            />
          </>
        }
      />
    </>
  );
};
export default CompanyCertificateInfo;
