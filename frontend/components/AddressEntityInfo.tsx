import { shortenAddress } from '@utils/eth';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';
import { Card, StyledBody } from 'baseui/card';
import { StatefulPopover, TRIGGER_TYPE } from 'baseui/popover';
import { ICompany } from 'interface';
import proofchain from 'proofchain';
import React, { useEffect, useState } from 'react';
import CompanyEntityTypeBadge from './CompanyEntityTypeBadge';
import LoadingSkeleton from './loading/LoadingSkeleton';

interface IAddressEntityInfoProps {
  children: string;
}
const AddressEntityInfoContent: React.FC<IAddressEntityInfoProps> = ({
  children,
}) => {
  const [company, setCompany] = useState<ICompany>(null);
  useEffect(() => {
    (async () => {
      const result = await proofchain().company.getCompany(children);
      setCompany(result);
    })();
  }, [children]);
  if (!company) return <LoadingSkeleton />;
  return (
    <Card title={company.name}>
      <StyledBody>
        <CompanyEntityTypeBadge entityType={company.entityType} />
      </StyledBody>
    </Card>
  );
};
const AddressEntityInfo: React.FC<IAddressEntityInfoProps> = ({ children }) => {
  return (
    <StatefulPopover
      content={() => (
        <AddressEntityInfoContent>{children}</AddressEntityInfoContent>
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
