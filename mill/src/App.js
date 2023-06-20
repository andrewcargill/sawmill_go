import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './About';
import TestApi from './pages/TestApi';
import Layout from './pages/Layout';
import TestPostApi from './pages/TestPostApi';

const App = () => {
  return (
    <Router basename={`/${process.env.PUBLIC_URL}`}>
      <Layout />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="test" element={<TestApi />} />
        <Route path="post" element={<TestPostApi />} />
      </Routes>
    </Router>

  );
};

export default App;
