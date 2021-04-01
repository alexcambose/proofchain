import * as React from 'react';
import { AppNavBar, setItemActive } from 'baseui/app-nav-bar';
import { ChevronDown, Delete, Overflow, Upload } from 'baseui/icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import Footer from '@components/navigation/Footer';
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
        // @ts-ignore
        overrides={{
          Root: {
            style: ({ $theme }) => ({
              boxShadow: $theme.lighting.shadow400,
              marginBottom: $theme.sizing.scale100,
            }),
          },
        }}
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
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default ClientLayout;
