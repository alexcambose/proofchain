import Button from '@components/Button';
import { KIND, SIZE } from 'baseui/button';
import { useRouter } from 'next/router';
import React from 'react';

interface IViewMaterialButtonProps {
  id: number;
  baseUrl: string;
}

const ViewButton: React.FC<IViewMaterialButtonProps> = ({
  id,
  baseUrl
}) => {
  const router = useRouter();
  const onViewClick = () => {
    router.push(`${baseUrl}/${id}`);
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
export default ViewButton;
