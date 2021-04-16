import { Tag, TagProps } from 'baseui/tag';
import { CompanyEntityTypeEnum } from 'proofchain-library';
import React from 'react';

interface ICompanyEntityTypeTagProps extends TagProps {
  entityType: CompanyEntityTypeEnum;
}
const badgeConfig = {
  [CompanyEntityTypeEnum.LOGISTIC]: {
    children: 'Logistic',
  },
  [CompanyEntityTypeEnum.MANUFACTURER]: {
    children: 'Manufacturer',
  },
  [CompanyEntityTypeEnum.RETAILER]: {
    children: 'Retailer',
  },
  [CompanyEntityTypeEnum.WAREHOUSE]: {
    children: 'Warehouse',
  },
};
const CompanyEntityTypeTag: React.FC<ICompanyEntityTypeTagProps> = ({
  entityType,
  ...props
}) => {
  if (!badgeConfig[entityType]) return null;
  return (
    <Tag closeable={false} {...props}>
      {badgeConfig[entityType]?.children}
    </Tag>
  );
};

export default CompanyEntityTypeTag;
