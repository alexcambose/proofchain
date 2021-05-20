import Tabs from '@components/tab/Tabs';
import { useStyletron } from 'baseui';
import { ORIENTATION } from 'baseui/tabs-motion';
import { IMaterial, IMaterialInfo } from 'interface';
import * as React from 'react';
import ClientMaterialCertificates from './material/ClientMaterialCertificates';
import ClientMaterialHistory from './material/ClientMaterialHistory';
import ClientMaterialInfoInformation from './material/ClientMaterialInfoInformation';
interface IClientMaterialInfoProps {
  materialInstance: IMaterialInfo;
  material: IMaterial;
  mintEvent: any;
}

const ClientMaterialInfo: React.FunctionComponent<IClientMaterialInfoProps> = ({
  materialInstance,
  material,
  mintEvent,
}) => {
  return (
    <Tabs
      tabs={[
        {
          title: 'Information',
          content: (
            <ClientMaterialInfoInformation
              material={material}
              mintEvent={mintEvent}
            />
          ),
        },
        {
          title: 'History',
          content: (
            <ClientMaterialHistory
              material={material}
              materialInstance={materialInstance}
              mintEvent={mintEvent}
            />
          ),
        },
        {
          title: 'Certificates',
          content: <ClientMaterialCertificates material={material} />,
        },
      ]}
      orientation={ORIENTATION.vertical}
    />
  );
};

export default ClientMaterialInfo;
