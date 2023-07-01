import React from 'react';
import './App.css';
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
import MoistureByPlank from './components/MoistureByPlank';
import TreeMoisturePost from './pages/TreeMoisturePost';
import MillAddLogs from './pages/MillAddLogs';
import MillHome from './pages/MillHome';
import MillAddTrees from './pages/MillAddTrees';
import TestApiGps from './pages/TestApiGps';
import TestApiGpsMap from './pages/TestApiGpsMap';
import TestApiGpsTwo from './pages/TestApiGpsTwo';
import SecureHome from './SecureHome';
import LoggedOut from './LoggedOut';
import MillAddMoisture from './pages/MillAddMoisture';
import TreeList from './pages/MillListTrees';
import TreeDetail from './pages/MillTreeDetail';
import TreeEdit from './pages/MillTreeEdit';


const App = () => {
  return (
    <Router basename={`/${process.env.PUBLIC_URL}`}>
      <Layout />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="home_secure" element={<SecureHome />} />
        <Route path="logout_success" element={<LoggedOut />} />
      
        <Route path="test_crud" element={<TestApiCrud />} />
        <Route path="test_gps" element={<TestApiGps />} />
        <Route path="test_gps_two" element={<TestApiGpsTwo />} />
        <Route path="test_gps_map" element={<TestApiGpsMap />} />

        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
      
        <Route path="tree_crud" element={<TreeCrud/>} />
       
        <Route path="log_crud" element={<TreeLogCrud />} />
     
        <Route path="plank_crud" element={<TreePlankCrud />} />
      
        <Route path="water_crud" element={<TreeMoistureCrud />} />
        <Route path="water_post" element={<TreeMoisturePost />} />
        <Route path="mill_home" element={<MillHome />} />

        <Route path="tree_list" element={<TreeList />} />
        <Route path="/tree/:id" element={<TreeDetail />} />
        <Route path="/tree/:id/edit" element={<TreeEdit />} />

        <Route path="mill_add_planks" element={<MillAddPlanks />} />
        <Route path="mill_add_logs" element={<MillAddLogs />} />
        <Route path="mill_add_trees" element={<MillAddTrees />} />
        <Route path="mill_add_moisture" element={<MillAddMoisture />} />
        <Route path="moisture_by_planks" element={<MoistureByPlank />} />



      </Routes>
    </Router>

  );
};

export default App;
