import { styled } from 'baseui';
import config from 'config';

interface IAddressProps {
  children: React.ReactNode;
}
const CustomCode = styled('code', {
  cursor: 'pointer',
});
const Address: React.FC<IAddressProps> = ({ children }) => {
  const onClick = () => {
    var win = window.open(
      config.ethProvider.default.etherscan + 'address/' + children,
      '_blank'
    );
    win.focus();
  };
  return <CustomCode onClick={onClick}>{children}</CustomCode>;
};
export default Address;
