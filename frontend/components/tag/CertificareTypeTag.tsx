import { CertificateTypeEnum } from '@enums';
import { Tag } from 'baseui/tag';
import * as React from 'react';

export const certificateTypeOptions = [
  {
    label: 'Animal Welfare',
    id: CertificateTypeEnum.ANIMAL_WELFARE,
  },
  {
    label: 'Environmental Impact',
    id: CertificateTypeEnum.ENVIRONMENTAL_IMPACT,
  },
  {
    label: 'Health and Nutrition',
    id: CertificateTypeEnum.HEALTH_AND_NUTRITION,
  },
  {
    label: 'Safety and Quality',
    id: CertificateTypeEnum.SAFETY_AND_QUALITY,
  },
  {
    label: 'Social Impact',
    id: CertificateTypeEnum.SOCIAL_IMPACT,
  },
  {
    label: 'Other',
    id: CertificateTypeEnum.OTHER,
  },
];
interface ICertificateTypeTagProps {
  type: CertificateTypeEnum;
}

const CertificateTypeTag: React.FunctionComponent<ICertificateTypeTagProps> = ({
  type,
  ...props
}) => {
  return (
    <Tag
      closeable={false}
      overrides={{
        Text: {
          style: ({ $theme }) => ({
            maxWidth: 'auto',
          }),
        },
      }}
      {...props}
    >
      {certificateTypeOptions.find((e) => e.id == type).label}
    </Tag>
  );
};

export default CertificateTypeTag;
