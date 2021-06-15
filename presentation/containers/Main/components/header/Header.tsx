import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
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
import { Parallax } from 'react-scroll-parallax';

import config from 'config';
import LoadingOverlay from './LoadingOverlay';
interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef();
  const scrollHandler = () => {
    if (videoRef.current) {
      if (scrollY > window.innerHeight + 300) {
        // @ts-ignore
        videoRef.current.pause();
      } else {
        // @ts-ignore
        videoRef.current.play();
      }
    }
  };
  useEffect(() => {
    if (!isDevelopment()) {
      // @ts-ignore
      videoRef.current.play();
    }
  }, []);
  useEffect(() => {
    if (isLoaded) {
      document.body.style.overflowY = 'scroll';
      document.addEventListener('scroll', scrollHandler);
    } else {
      document.body.style.overflowY = 'hidden';
      document.removeEventListener('scroll', scrollHandler);
    }
  }, [isLoaded]);
  return (
    <HeaderContainer>
      <LoadingOverlay isVisible={!isLoaded} />
      <HeaderOverlay />
      <HeaderVideo
        onLoadedData={() =>
          setTimeout(() => {
            setIsLoaded(true);
          }, 4000)
        }
        ref={videoRef}
        muted
        loop
      >
        <source src="video.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </HeaderVideo>
      <Parallax y={['-100px', '100px']}>
        <HeaderContent>
          <HeaderText1>
            In the hyper-connected and ever-evolving world,
          </HeaderText1>
          <HeaderText2>
            transparency is <HeaderText2Silent>the new</HeaderText2Silent>{' '}
            power.
          </HeaderText2>
          <HeaderText3>
            We leverage blockchain based infrastructure to create reliable and
            tamper-proof supply chain traceability.
          </HeaderText3>
          <HeaderActions>
            <Link href={config.demoLink}>
              <Button>View Demo</Button>
            </Link>
            <Link href="#vision">Learn more</Link>
          </HeaderActions>
        </HeaderContent>
      </Parallax>
      <MouseContainer>
        <Link href="#vision">
          <Mouse />
        </Link>
      </MouseContainer>
    </HeaderContainer>
  );
};

export default Header;
