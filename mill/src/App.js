import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './About';
import TestApi from './pages/TestApi';
import Layout from './pages/Layout';

const App = () => {
  return (
    <Router basename={`/${process.env.PUBLIC_URL}`}>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="test" element={<TestApi />} />
      </Routes>
    </Router>

  );
};

export default App;
