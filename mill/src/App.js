import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Layout from './pages/Layout';
import { Login, Logout } from './pages/TestLogIn';
import TestApiCrud from './pages/TestApiCrud';
import TreeCrud from './pages/TreeCrud';
import TreeLogCrud from './pages/TreeLogCrud';
import TreePlankCrud from './pages/TreePlankCrud';
import TreeMoistureCrud from './pages/TreeMoistureCrud';
import MillAddPlanks from './pages/MillAddPlanks';

const App = () => {
  return (
    <Router basename={`/${process.env.PUBLIC_URL}`}>
      <Layout />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="about" element={<About />} />
      
        <Route path="test_crud" element={<TestApiCrud />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
      
        <Route path="tree_crud" element={<TreeCrud/>} />
       
        <Route path="log_crud" element={<TreeLogCrud />} />
     
        <Route path="plank_crud" element={<TreePlankCrud />} />
      
        <Route path="water_crud" element={<TreeMoistureCrud />} />
        <Route path="mill_add_planks" element={<MillAddPlanks />} />

      </Routes>
    </Router>

  );
};

export default App;
