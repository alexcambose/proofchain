import { CardProps, Card as BaseUiCard } from 'baseui/card';
import * as React from 'react';

interface ICardProps extends CardProps {}

const Card: React.FunctionComponent<ICardProps> = (props) => {
  return (
    <BaseUiCard
      overrides={{
        Root: {
          style: ({ $theme }) => ({
            boxShadow: $theme.lighting.shadow400,
          }),
        },
      }}
      {...props}
    />
  );
};

export default Card;
