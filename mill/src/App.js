import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Layout from './pages/Layout';
import { Login, Logout } from './pages/TestLogIn';
import Tree from './pages/Tree';
import TreeLog from './pages/TreeLog';
import TreePlank from './pages/TreePlank';
import TreeMoisture from './pages/TreeMoisture';
import TestApiCrud from './pages/TestApiCrud';
import TreeCrud from './pages/TreeCrud';
import TreeLogCrud from './pages/TreeLogCrud';
import TreePlankCrud from './pages/TreePlankCrud';
import TreeMoistureCrud from './pages/TreeMoistureCrud';

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
        <Route path="tree" element={<Tree />} />
        <Route path="tree_crud" element={<TreeCrud/>} />
        <Route path="log" element={<TreeLog />} />
        <Route path="log_crud" element={<TreeLogCrud />} />
        <Route path="plank" element={<TreePlank />} />
        <Route path="plank_crud" element={<TreePlankCrud />} />
        <Route path="water" element={<TreeMoisture />} />
        <Route path="water_crud" element={<TreeMoistureCrud />} />
      </Routes>
    </Router>

  );
};

export default App;
