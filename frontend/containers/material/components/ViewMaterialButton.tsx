import Button from '@components/Button';
import { KIND, SIZE } from 'baseui/button';
import { useRouter } from 'next/router';
import React from 'react';

interface IViewMaterialButtonProps {
  materialTokenId: number;
}

const ViewMaterialButton: React.FC<IViewMaterialButtonProps> = ({
  materialTokenId,
}) => {
  const router = useRouter();
  const onViewClick = () => {
    router.push(`/material/${materialTokenId}`);
  };
  return (
    <Button
      onClick={onViewClick}
      kind={KIND.secondary}
      overrides={{
        BaseButton: {
          style: ({ $theme }) => ({
            width: '100%',
          }),
        },
      }}
      size={SIZE.compact}
    >
      View
    </Button>
  );
};
export default ViewMaterialButton;
