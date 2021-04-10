import * as React from 'react';
import { useEffect, useRef } from 'react';
import Button from '@components/button/Button';
import {
  HeaderActions,
  HeaderContainer,
  HeaderContent,
  HeaderOverlay,
  HeaderText1,
  HeaderText2,
  HeaderText2Silent,
  HeaderText3,
  HeaderVideo,
  MouseContainer,
} from './Header.styled';
import Link from '@components/link/Link';
import Mouse from '@assets/svg/mouse.svg';
import { isDevelopment } from '@utils/next';
interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const videoRef = useRef();
  useEffect(() => {
    if (!isDevelopment) {
      // @ts-ignore
      videoRef.current.play();
    }
  }, []);
  return (
    <HeaderContainer>
      <HeaderOverlay />
      <HeaderVideo ref={videoRef} muted loop>
        <source src="video.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </HeaderVideo>
      <HeaderContent>
        <HeaderText1>
          In the hyper-connected and ever-evolving world,
        </HeaderText1>
        <HeaderText2>
          transparency is <HeaderText2Silent>the new</HeaderText2Silent> power.
        </HeaderText2>
        <HeaderText3>
          We leverage blockchain based infrastructure to create reliable and
          tamper-proof supply chain traceability.
        </HeaderText3>
        <HeaderActions>
          <Button>View Demo</Button>
          <Link href="#">Learn more</Link>
        </HeaderActions>
      </HeaderContent>
      <MouseContainer>
        <Mouse />
      </MouseContainer>
    </HeaderContainer>
  );
};

export default Header;
