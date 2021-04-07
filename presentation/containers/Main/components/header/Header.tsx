import * as React from 'react';
import { useEffect, useRef } from 'react';
import { HeaderContainer, HeaderOverlay, HeaderVideo } from './Header.styled';

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const videoRef = useRef();
  useEffect(() => {
    // @ts-ignore
    // videoRef.current.play();
  }, []);
  return (
    <HeaderContainer>
      <HeaderOverlay />
      <HeaderVideo ref={videoRef} muted loop id="myVideo">
        <source src="video.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </HeaderVideo>
    </HeaderContainer>
  );
};

export default Header;
