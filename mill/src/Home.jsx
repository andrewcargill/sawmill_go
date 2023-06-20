import React from 'react';
import Contact from './pages/TestApi';
import Layout from './pages/Layout';

const Home = () => {
  return (
    <div>
      <div>
      <Layout />
      </div>
      <h1>Hello, React!</h1>
      <Contact />
    </div>
  );
};

export default Home;
