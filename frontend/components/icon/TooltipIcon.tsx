import { StatefulTooltip } from 'baseui/tooltip';
import * as React from 'react';
import IconContainer from './IconContainer';
// export const IconContainer = styled('span', ({ $theme }) => ({
//   marginLeft: '6px',
//   fontSize: '.7em',
//   color: $theme.colors.contentTertiary,
// }));
interface IHelpIconProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

const HelpIcon: React.FunctionComponent<IHelpIconProps> = ({
  children,
  icon,
}) => {
  return (
    <StatefulTooltip
      overrides={{
        Body: {
          style: ({ $theme }) => ({
            maxWidth: '260px',
          }),
        },
      }}
      content={children}
    >
      <span>
        <IconContainer icon={icon} style={{ fontSize: '.86em' }} />
      </span>
    </StatefulTooltip>
  );
};

export default HelpIcon;
