import { Skeleton } from 'baseui/skeleton';
import React from 'react';

interface LoadingSkeletonProps {}
const LoadingSkeleton: React.FC<LoadingSkeletonProps> = () => {
  return <Skeleton rows={10} height="200px" width="100%" animation />;
};

export default LoadingSkeleton;
