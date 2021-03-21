import { StyledLink } from 'baseui/link';
import React from 'react';

interface IMaterialLinkProps {
  children: string | number;
}
const MaterialLink: React.FC<IMaterialLinkProps> = ({ children }) => (
  <StyledLink target="_blank" href={`/material/${children}`}>
    {children}
  </StyledLink>
);
export default MaterialLink;
