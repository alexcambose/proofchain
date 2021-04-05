import { shortenAddress } from '@utils/eth';
import { StyledLink } from 'baseui/link';
import config from 'config';
import React from 'react';
import { number } from 'yup';

interface ITransactionLinkProps {
  children: string;
  full?: boolean;
  maxLength?: number;
  noLink?: boolean;
}
const TransactionLink: React.FC<ITransactionLinkProps> = ({
  children,
  full,
  maxLength = 10,
  noLink,
}) =>
  !noLink ? (
    <StyledLink
      target="_blank"
      href={`${config.ethProvider.default.etherscan}tx/${children}`}
    >
      {full ? children : shortenAddress(children, maxLength)}
    </StyledLink>
  ) : full ? (
    <>{children}</>
  ) : (
    <>{shortenAddress(children, maxLength)}</>
  );
export default TransactionLink;
