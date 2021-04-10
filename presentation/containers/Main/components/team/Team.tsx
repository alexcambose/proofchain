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
    image: 'https://avatars.githubusercontent.com/u/12383978',
    name: 'Alexandru Cambose',
    role: 'Founder',
  },
];
const Team: React.FunctionComponent<ITeamProps> = (props) => {
  return (
    <TeamContainer id="team">
      <TeamTitle>Team</TeamTitle>
      <TeamMembersContainer>
        {team.map((member) => (
          <TeamMember>
            <TeamMemberImage src={member.image} />
            <TeamMemberName>{member.name}</TeamMemberName>
            <TeamMemberRole>{member.role}</TeamMemberRole>
          </TeamMember>
        ))}
      </TeamMembersContainer>
    </TeamContainer>
  );
};

export default Team;
