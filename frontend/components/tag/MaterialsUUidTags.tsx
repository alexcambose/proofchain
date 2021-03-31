import { Tag } from 'baseui/tag';
import React from 'react';
import MaterialUuidQrModal from '../MaterialUuidQrModal';

interface IMaterialsUuidTagsProps {
  uuids: number[];
}
const MaterialsUuidTags: React.FC<IMaterialsUuidTagsProps> = ({ uuids }) => {
  const tags = uuids.map((e) => (
    <MaterialUuidQrModal
      materialUuid={e}
      key={e}
      trigger={(onClick) => (
        <Tag onClick={onClick} closeable={false}>
          {e}
        </Tag>
      )}
    />
  ));
  return <>{tags}</>;
};
export default MaterialsUuidTags;
