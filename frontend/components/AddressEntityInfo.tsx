import { shortenAddress } from '@utils/eth';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';
import { Card, StyledBody } from 'baseui/card';
import { StatefulPopover, TRIGGER_TYPE } from 'baseui/popover';
import { ICompany } from 'interface';
import proofchain from 'proofchain';
import React, { useEffect, useState } from 'react';
import CompanyEntityTypeTag from './tag/CompanyEntityTypeTag';
import LoadingSkeleton from './loading/LoadingSkeleton';

interface IAddressEntityInfoProps {
  children: string;
  isCertificateAuthority?: boolean;
}
const AddressEntityInfoContent: React.FC<IAddressEntityInfoProps> = ({
  children,
  isCertificateAuthority,
}) => {
  const [company, setCompany] = useState<ICompany>(null);
  useEffect(() => {
    (async () => {
      let result;
      if (!isCertificateAuthority) {
        result = await proofchain().company.getCompany(children);
      } else {
        result = await proofchain().certificateAuthority.getCertificateAuthority(
          children
        );
      }
      setCompany(result);
    })();
  }, [children]);
  if (!company) return <LoadingSkeleton />;
  return (
    <Card title={company.name}>
      <StyledBody>
        <CompanyEntityTypeTag entityType={company.entityType} />
      </StyledBody>
    </Card>
  );
};
const AddressEntityInfo: React.FC<IAddressEntityInfoProps> = ({
  children,
  isCertificateAuthority,
}) => {
  return (
    <StatefulPopover
      content={() => (
        <AddressEntityInfoContent
          isCertificateAuthority={isCertificateAuthority}
        >
          {children}
        </AddressEntityInfoContent>
      )}
      returnFocus
      triggerType={TRIGGER_TYPE.hover}
      autoFocus
    >
      {shortenAddress(children, 10)}
    </StatefulPopover>
  );
};
export default AddressEntityInfo;
