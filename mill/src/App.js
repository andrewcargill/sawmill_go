import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Contact from './Contact';
import About from './About';


const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/about" element={<Contact />} />
      </Routes>
   
  );
};

export default App;