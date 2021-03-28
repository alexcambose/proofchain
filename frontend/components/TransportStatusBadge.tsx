import { TransportStatusEnum } from '@enums';
import { KIND, Tag } from 'baseui/tag';
import React, { useMemo } from 'react';

interface ITransportStatusBadgeProps {
  transportStatus: TransportStatusEnum;
}
const TransportStatusBadge: React.FC<ITransportStatusBadgeProps> = ({
  transportStatus,
}) => {
  // @ts-ignore
  transportStatus = parseInt(transportStatus);
  const config = useMemo<{ kind: any; children: any }>(() => {
    switch (transportStatus) {
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

export default TransportStatusBadge;
