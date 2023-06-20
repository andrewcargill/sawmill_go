import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './About';

const App = () => {
  return (
    <Router basename={`/${process.env.PUBLIC_URL}`}>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
