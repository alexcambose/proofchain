import * as React from 'react';
import Navbar from '@components/navbar/Navbar';
import Header from './components/header/Header';
import Vision from './components/vision/Vision';

interface IMainIndexProps {}

const MainIndex: React.FunctionComponent<IMainIndexProps> = (props) => {
  return (
    <>
      <Navbar />
      <Header />
      <Vision />
    </>
  );
};

export default MainIndex;
