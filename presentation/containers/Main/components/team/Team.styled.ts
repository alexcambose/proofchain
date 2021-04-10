import styled, { css } from 'styled-components';

export const TeamContainer = styled.section`
  position: relative;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: column;
  z-index: 0;
  padding-top: ${({ theme }) => theme.sizing.scale2400};
  padding-bottom: ${({ theme }) => theme.sizing.scale2400};
  background: ${({ theme }) => theme.colors.backgroundLighter};
`;

export const TeamTitle = styled.h1`
  margin-top: ${({ theme }) => theme.sizing.scale1600};
  ${({ theme }) => theme.typography.title};
  margin-bottom: ${({ theme }) => theme.sizing.scale800};
  text-align: center;
`;
export const TeamMembersContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const TeamMember = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const TeamMemberImage = styled.div`
  margin: ${({ theme }) => theme.sizing.scale800};
  background: url(${({ src }) => src}) center;
  width: 300px;
  height: 400px;
`;
export const TeamMemberName = styled.div`
  font-weight: 800;
`;
export const TeamMemberRole = styled.div`
  font-size: ${({ theme }) => theme.font.small};
  margin-top: ${({ theme }) => theme.sizing.scale200};
`;
