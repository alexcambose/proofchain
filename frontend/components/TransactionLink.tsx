import { shortenAddress } from '@utils/eth';
import { StyledLink } from 'baseui/link';
import config from 'config';
import React from 'react';

interface ITransactionLinkProps {
  children: string;
  full?: boolean;
}
const TransactionLink: React.FC<ITransactionLinkProps> = ({
  children,
  full,
}) => (
  <StyledLink
    target="_blank"
    href={`${config.ethProvider.default.etherscan}tx/${children}`}
  >
    {full ? children : shortenAddress(children, 10)}
  </StyledLink>
);
export default TransactionLink;
