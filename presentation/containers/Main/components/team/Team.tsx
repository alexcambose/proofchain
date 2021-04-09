import * as React from 'react';
import {
  TeamContainer,
  TeamMember,
  TeamMemberImage,
  TeamMemberName,
  TeamMemberRole,
  TeamMembersContainer,
  TeamTitle,
} from './Team.styled';

interface ITeamProps {}
const team = [
  {
    image: '',
    name: 'Alexandru Cambose',
    role: 'Founder',
  },
];
const Team: React.FunctionComponent<ITeamProps> = (props) => {
  return (
    <TeamContainer>
      <TeamTitle>Team</TeamTitle>
      <TeamMembersContainer>
        {team.map((member) => (
          <TeamMember>
            <TeamMemberImage src="https://via.placeholder.com/240x300.png" />
            <TeamMemberName>{member.name}</TeamMemberName>
            <TeamMemberRole>{member.role}</TeamMemberRole>
          </TeamMember>
        ))}
      </TeamMembersContainer>
    </TeamContainer>
  );
};

export default Team;
