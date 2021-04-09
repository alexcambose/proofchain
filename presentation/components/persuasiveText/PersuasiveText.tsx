import * as React from 'react';
import uuid from 'react-uuid';
import {
  PersuasiveTextContainer,
  PersuasiveTextHighlighted,
} from './PersuasiveText.styled';

interface IPersuasiveTextProps {
  small?: boolean;
  content: {
    text: string;
    isHighlighted?: boolean;
  }[];
}

const PersuasiveText: React.FunctionComponent<IPersuasiveTextProps> = ({
  content,
  small,
}) => {
  return (
    <PersuasiveTextContainer small={small}>
      {content.map((item) =>
        item.isHighlighted ? (
          <PersuasiveTextHighlighted>{item.text}</PersuasiveTextHighlighted>
        ) : (
          item.text
        )
      )}
    </PersuasiveTextContainer>
  );
};

export default PersuasiveText;
