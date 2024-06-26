import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./About";
import { Box, Container } from "@mui/material";
import { Login, Logout } from "./pages/TestLogIn";
import TestApiCrud from "./pages/TestApiCrud";
import TreeCrud from "./pages/TreeCrud";
import TreeLogCrud from "./pages/TreeLogCrud";
import TreePlankCrud from "./pages/TreePlankCrud";
import TreeMoistureCrud from "./pages/TreeMoistureCrud";
import MillAddPlanks from "./pages/MillAddPlanks";
import TreeMoisturePost from "./pages/TreeMoisturePost";
import MillAddLogs from "./pages/MillAddLogs";
import MillHome from "./pages/MillHome";
import MillAddTrees from "./pages/MillAddTrees";
import TestApiGps from "./pages/TestApiGps";
import TestApiGpsMap from "./pages/TestApiGpsMap";
import TestApiGpsTwo from "./pages/TestApiGpsTwo";
import SecureHome from "./SecureHome";
import LoggedOut from "./LoggedOut";
import MillAddMoisture from "./pages/MillAddMoisture";
import TreeList from "./pages/MillListTrees";
import TreeDetail from "./pages/MillTreeDetail";
import TreeEdit from "./pages/MillTreeEdit";
import LogList from "./pages/MillListLogs";
import LogDetail from "./pages/MillLogDetail";
import MillEditLog from "./pages/MillEditLog";
import MillEditPlank from "./pages/MillEditPlank";
import PlankDetail from "./pages/MillPlankDetail";
import PlankList from "./pages/MillListPlanks";
import PlankReport from "./pages/PlankReport/PlankReport";
import PerfectSolution from "./PerfectSolution";
import Transparent from "./TransparentForestry";
import Navigation from "./Navigation";
import LandingPage from "./LandingPage";
import PlankListView from "./pages/ListViews/Plank/PlankListView";
import AddPlank from "./pages/AddData/Plank/AddPlank";
import PageContentContainer from "./components/CustomBoxes/PageContentContainer";
import Footer from "./Footer";
import Demo from "./pages/ListViews/Plank/Demo";
import DemoDesktop from "./pages/ListViews/Plank/DemoDesktop";
import PlankMoisture from "./pages/ListViews/Plank/Components/PlankMoisture";
import TreeHome from "./pages/mainPages/TreeHome";
import DemoPlankList from "./pages/ListViews/Plank/DemoPlankList";

const App = () => {
  return (
    <Router basename={`/${process.env.PUBLIC_URL}`}>
      {/* <Layout /> */}

      <Navigation />

      <PageContentContainer>
        <Box id="rootbox" sx={{ padding: "55px 0 0", margin: "0" }}>
          <Routes>
            {/* <Route path="" element={<Home />} /> */}
            <Route path="" element={<LandingPage />} />
            <Route path="nav" element={<Navigation />} />
            <Route path="about" element={<About />} />
            <Route path="product" element={<PerfectSolution />} />
            <Route path="transparent" element={<Transparent />} />
            <Route path="demo" element={<Demo />} />
            <Route path="demo_desktop" element={<DemoDesktop />} />
            <Route path="planks" element={<DemoPlankList />} />

            <Route path="home_secure" element={<SecureHome />} />
            <Route path="logout_success" element={<LoggedOut />} />

            <Route path="test_crud" element={<TestApiCrud />} />
            <Route path="test_gps" element={<TestApiGps />} />
            <Route path="test_gps_two" element={<TestApiGpsTwo />} />
            <Route path="test_gps_map" element={<TestApiGpsMap />} />

            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />

            <Route path="tree_crud" element={<TreeCrud />} />

            <Route path="log_crud" element={<TreeLogCrud />} />

            <Route path="plank_crud" element={<TreePlankCrud />} />

            <Route path="water_crud" element={<TreeMoistureCrud />} />
            <Route path="water_post" element={<TreeMoisturePost />} />
            <Route path="quick_add" element={<MillHome />} />

            <Route path="trees" element={<TreeList />} />
            <Route path="/tree/:id" element={<TreeDetail />} />
            <Route path="/tree/:id/edit" element={<TreeEdit />} />

            <Route path="logs" element={<LogList />} />

            <Route path="/log/:id" element={<LogDetail />} />
            <Route path="/log/:id/edit" element={<MillEditLog />} />

            <Route path="plank" element={<PlankList />} />
            <Route path="newplank" element={<PlankListView />} />
            <Route path="/plank/:id" element={<PlankDetail />} />
            <Route path="/plank/:id/edit" element={<MillEditPlank />} />

            <Route path="/report/:id" element={<PlankReport />} />

            <Route path="mill_add_planks" element={<MillAddPlanks />} />
            <Route path="add_plank" element={<AddPlank />} />
            <Route path="mill_add_logs" element={<MillAddLogs />} />
            <Route path="mill_add_trees" element={<MillAddTrees />} />
            <Route path="mill_add_moisture" element={<MillAddMoisture />} />
            <Route path="moisture" element={<PlankMoisture />} />

            <Route path="tree" element={<TreeHome />} />
          </Routes>
          <Footer />
        </Box>
      </PageContentContainer>
    </Router>
  );
};

export default App;
