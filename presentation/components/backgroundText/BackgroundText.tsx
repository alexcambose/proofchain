import styled from 'styled-components';
const BackgroundTextContainer = styled.div`
  opacity: 0.009;
  font-size: 18vw;
  font-weight: 800;
  top: 50vh;
  left: -100px;
  text-transform: uppercase;
  position: absolute;
  user-select: none;
`;
import * as React from 'react';
import { useEffect, useRef } from 'react';

interface IBackgroundTextProps {
  children: React.ReactNode;
}

const BackgroundText: React.FunctionComponent<IBackgroundTextProps> = ({
  children,
}) => {
  const textRef = useRef();
  const onScroll = () => {
    const element = textRef.current;
    // @ts-ignore
    const { top } = element.getBoundingClientRect();
    if (window.innerHeight > top) {
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
    <BackgroundTextContainer ref={textRef}>{children}</BackgroundTextContainer>
  );
};

export default BackgroundText;
