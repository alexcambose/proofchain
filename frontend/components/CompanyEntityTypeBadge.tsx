import { Tag } from 'baseui/tag';
import CompanyEntityTypeEnum from 'proofchain-library/src/enums/CompanyEntityTypeEnum';
import React from 'react';

interface ICompanyEntityTypeBadgeProps {
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
const CompanyEntityTypeBadge: React.FC<ICompanyEntityTypeBadgeProps> = ({
  entityType,
}) => {
  return <Tag closeable={false}>{badgeConfig[entityType].children}</Tag>;
};

export default CompanyEntityTypeBadge;
