import * as React from 'react';
import { AppNavBar, setItemActive } from 'baseui/app-nav-bar';
import { ChevronDown, Delete, Overflow, Upload } from 'baseui/icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
interface IClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FunctionComponent<IClientLayoutProps> = ({
  children,
}) => {
  const router = useRouter();
  const [mainItems, setMainItems] = React.useState([
    {
      id: 'scan',
      icon: () => <FontAwesomeIcon icon="qrcode" />,
      label: 'Scan Code',
      active: true,
    },
  ]);
  const onTitleClick = () => {
    router.push('/client');
  };
  return (
    <>
      <AppNavBar
        title={
          <span onClick={onTitleClick} style={{ cursor: 'pointer' }}>
            Proofchain
          </span>
        }
        mainItems={mainItems}
        onMainItemSelect={(item) => {
          setMainItems((prev) =>
            prev.map((e) => {
              // @ts-ignore
              if (e.id === item.id) return { ...e, active: true };
              return e;
            })
          );
        }}
      />
      {children}
    </>
  );
};

export default ClientLayout;
