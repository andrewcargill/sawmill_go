import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './About';


const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<About />} />
      </Routes>
   
  );
};

export default App;