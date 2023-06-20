import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './About';
import TestApi from './pages/TestApi';
import Layout from './pages/Layout';
import { Login, Logout } from './pages/TestLogIn';
import Tree from './pages/Tree';
import TreeLog from './pages/TreeLog';
import TreePlank from './pages/TreePlank';
import TreeMoisture from './pages/TreeMoisture';

const App = () => {
  return (
    <Router basename={`/${process.env.PUBLIC_URL}`}>
      <Layout />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="test" element={<TestApi />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="tree" element={<Tree />} />
        <Route path="log" element={<TreeLog />} />
        <Route path="plank" element={<TreePlank />} />
        <Route path="water" element={<TreeMoisture />} />
      </Routes>
    </Router>

  );
};

export default App;
