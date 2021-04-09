import * as React from 'react';
import Navbar from '@components/navbar/Navbar';
import Header from './components/header/Header';
import Vision from './components/vision/Vision';
import Information from './components/information/Information';
import Documentation from './components/documentation/Documentation';
import Team from './components/team/Team';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';

interface IMainIndexProps {}

const MainIndex: React.FunctionComponent<IMainIndexProps> = (props) => {
  return (
    <>
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
