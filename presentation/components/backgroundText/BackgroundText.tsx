import styled from 'styled-components';
const BackgroundTextContainer = styled.div`
  opacity: 0.02;

  font-weight: 800;
  top: 50vh;
  left: -100px;
  text-transform: uppercase;
  position: absolute;
  user-select: none;
  z-index: -1;
  ${({ smaller }) => (smaller ? `font-size: 10vw;` : `font-size: 18vw;`)}
`;
import * as React from 'react';
import { useEffect, useRef } from 'react';

interface IBackgroundTextProps {
  children: React.ReactNode;
  smaller?: boolean;
}

const BackgroundText: React.FunctionComponent<IBackgroundTextProps> = ({
  children,
  smaller,
}) => {
  const textRef = useRef();
  const onScroll = () => {
    const element = textRef.current;
    // @ts-ignore
    const { top, height } = element.getBoundingClientRect();
    if (window.innerHeight > top && top + height > 0) {
      // @ts-ignore
      element.style.left = Math.floor((window.innerHeight - top) / 8) + 'px';
    }
  };
  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []);
  return (
    <BackgroundTextContainer smaller={smaller} ref={textRef}>
      {children}
    </BackgroundTextContainer>
  );
};

export default BackgroundText;
