import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Contact from './Contact';
import About from './About';


const App = () => {
  return (
    <Router basename='/sawmill_go'>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/about" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;