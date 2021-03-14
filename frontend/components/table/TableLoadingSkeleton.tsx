import { Skeleton } from 'baseui/skeleton';
import React from 'react';

const TableLoadingSkeleton = () => (
  <Skeleton
    rows={3}
    animation={true}
    overrides={{
      Row: {
        style: {
          height: '20px',
          marginBottom: '15px',
        },
      },
    }}
  />
);
export default TableLoadingSkeleton;
