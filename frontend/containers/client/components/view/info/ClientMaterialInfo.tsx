import VerticalTable from '@components/table/VerticalTable';
import * as React from 'react';

interface IClientMaterialInfoProps {
  historyItem: any;
}

const ClientMaterialInfo: React.FunctionComponent<IClientMaterialInfoProps> = ({
  historyItem,
}) => {
  const { batchInstance, createEvent, materialInstance } = historyItem;
  return (
    <>
      <VerticalTable
        items={{
          Id: batchInstance.id,
          Code: batchInstance.code,
          'Current owner': batchInstance.owner,
          'Contains material': materialInstance.name,
          'Current Materials': batchInstance.uuids.join(','),
        }}
      />
    </>
  );
};

export default ClientMaterialInfo;
