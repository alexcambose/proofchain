import { TransportStatusEnum } from '@enums';
import { KIND, Tag } from 'baseui/tag';
import React, { useMemo } from 'react';

interface ITransportStatusTagProps {
  transportStatus: TransportStatusEnum;
}
const TransportStatusTag: React.FC<ITransportStatusTagProps> = ({
  transportStatus,
}) => {
  // @ts-ignore
  transportStatus = parseInt(transportStatus);
  const config = useMemo<{ kind: any; children: any }>(() => {
    switch (transportStatus) {
      case TransportStatusEnum.NONE:
        return {
          children: 'No status',
          kind: KIND.neutral,
        };
      case TransportStatusEnum.READY_FOR_TRANSIT:
        return {
          children: 'Ready for transit',
          kind: KIND.neutral,
        };
      case TransportStatusEnum.PENDING_TRANSIT:
        return {
          children: 'Pending transit',
          kind: KIND.accent,
        };
      case TransportStatusEnum.IN_TRANSIT:
        return {
          children: 'In transit',
          kind: KIND.purple,
        };
      case TransportStatusEnum.PENDING_FINALISED:
        return {
          children: 'Pending finalised',
          kind: KIND.accent,
        };
      case TransportStatusEnum.FINALISED:
        return {
          children: 'Finalised',
          kind: KIND.positive,
        };
    }
    return {
      children: 'unknown',
      kind: KIND.neutral,
    };
  }, [transportStatus]);
  return (
    <Tag closeable={false} kind={config.kind}>
      {config.children}
    </Tag>
  );
};

export default TransportStatusTag;
