import Navbar from '@components/navbar/Navbar';
import * as React from 'react';
import Contact from './components/contact/Contact';
import Documentation from './components/documentation/Documentation';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Information from './components/information/Information';
import Team from './components/team/Team';
import Vision from './components/vision/Vision';

interface IMainIndexProps {}

const MainIndex: React.FunctionComponent<IMainIndexProps> = (props) => {
  return (
    <>
      <a id="home"></a>

      <Navbar />
      <Header />
      <Vision />
      <Information />
      <Documentation />
      <Team />
      <Contact />
      <Footer />
    </>
  );
};

export default MainIndex;
