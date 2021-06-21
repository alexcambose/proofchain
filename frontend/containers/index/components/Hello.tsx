import { Display4, H2 } from 'baseui/typography';
import * as React from 'react';
import HelloInt from 'hello-international';
import { useEffect, useState } from 'react';
import { styled } from 'baseui';
import { useSelector } from 'react-redux';
import { State } from '@store/index';

interface IHelloGreetingProps {}
const greetings: { title: string; language: string }[] = [
  // bigger changes for hello :)
  { language: 'English', title: 'Hello' },
  { language: 'English', title: 'Hello' },
  { language: 'English', title: 'Hello' },
  { language: 'English', title: 'Hello' },
  { language: 'English', title: 'Hello' },
  { language: 'English', title: 'Hello' },
  { language: 'English', title: 'Hello' },
  { language: 'Arabic', title: 'Ahlan' },
  { language: 'Bulgarian', title: 'Zdrasti' },
  { language: 'Chinese', title: 'Nǐ hǎo' },
  { language: 'Dutch', title: 'Hallo' },
  { language: 'French', title: 'Salut' },
  { language: 'Gaelic', title: 'Hug' },
  { language: 'German', title: 'Hallo' },
  { language: 'Greek', title: 'Yasou' },
  { language: 'Hebrew', title: 'Shalom' },
  { language: 'Hindi', title: 'Hē' },
  { language: 'Icelandic', title: 'Halló' },
  { language: 'Indonesian', title: 'Salam' },
  { language: 'Italian', title: 'Ciao' },
  { language: 'Japanese', title: 'Yā, Yō' },
  { language: 'Korean', title: 'Anyoung' },
  { language: 'Polish', title: 'Hej' },
  { language: 'Portuguese', title: 'Oi' },
  { language: 'Romanian', title: 'Hei' },
  { language: 'Russian', title: 'Privet' },
  { language: 'Spanish', title: '¿Qué tal' },
  { language: 'Swedish', title: 'Hej' },
  { language: 'Turkish', title: 'Selam' },
  { language: 'Vietnamese', title: 'Chào' },
];
const HelloContainer = styled('div', ({ $theme }) => ({
  marginLeft: $theme.sizing.scale400,
  marginBottom: $theme.sizing.scale800,
  userSelect: 'none',
}));
const Title = styled('div', ({ $theme }) => ({
  ...$theme.typography.ParagraphXSmall,
  letterSpacing: '0.125rem',
  color: '#6c757d',
  fontSize: '0.8rem',
}));
const HelloGreeting: React.FunctionComponent<IHelloGreetingProps> = (props) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const name = useSelector((state: State) => state.user.name);
  const handleClick = () => {
    const random = () => Math.floor(Math.random() * greetings.length);

    setMessageIndex(random);
  };
  useEffect(() => {
    handleClick();
  }, []);
  return (
    <HelloContainer
      title={`Now you know how to say "hello" in ${greetings[0].language}.`}
    >
      <Title>Proofchain</Title>
      <Display4 onClick={handleClick}>
        {greetings[0].title}, {name} !
      </Display4>
    </HelloContainer>
  );
};

export default HelloGreeting;
