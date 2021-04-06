import { Skeleton } from 'baseui/skeleton';
import React from 'react';

interface LoadingSkeletonProps {
  rows?: number;
  height?: number;
}
const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  rows = 10,
  height = 200,
}) => {
  return <Skeleton rows={rows} height={height + 'px'} width="100%" animation />;
};

export default LoadingSkeleton;
