import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import css from "./styles/millHome.module.css";
import axios from "axios";
import UploadComponentNew from "./components/CloudinaryListTest";
import ImageCameraTest from "./components/CloudinaryButtonCameraTest";
import PageContentContainer from "./components/CustomBoxes/PageContentContainer";
import WorkSpacesIcon from "@mui/icons-material/Workspaces";
import { Grid, IconButton } from "@mui/material";
import ParkIcon from "@mui/icons-material/Park";
import ClearAll from "@mui/icons-material/ClearAll";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import CustomBox from "./components/CustomBoxes/CustomBoxes";
import CustomTypography from "./components/Typography/CustomTypography";

const SecureHome = () => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      window.location.href = "/login";
    } else {
      (async () => {
        try {
          const { data } = await axios.get(
            "https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/home/",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                "Content-Type": "application/json",
              },
            }
          );
          setMessage(data.message);
        } catch (e) {
          console.log("not auth");
        }
      })();
    }
  }, []);

  const navigate = useNavigate();

  const handleButtonClick = (route) => {
    navigate(route);
  };

  return (
    <PageContentContainer>
      {/* Welcome message from server */}

      <CustomBox>  
      <Grid container spacing={1}>
                    <Grid item xs={12} paddingBottom={2}>
                        <CustomTypography.heading>
                            Sawmill Dashboard
                        </CustomTypography.heading>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <CustomTypography.paragraph>
                         This is the home page for Sawmill Go. Here you can manage your inventory, logs, planks, and moisture levels.
                        </CustomTypography.paragraph>

                    </Grid>
                    </Grid>
      
    


      {/* menu items */}
      <CustomBox bgcolor={'white' } mt={4} >
      <Grid container spacing={1} alignItems={'center'}>
        <Grid container item xs={6} sm={3} flexDirection={'column'} alignItems={'center'} >
          <Grid item xs={12}>
            <IconButton color="primary" onClick={() => handleButtonClick("/trees")}>
              <ParkIcon style={{ fontSize: 50 }} />
            </IconButton>
          </Grid>

          <Grid item xs={12}>
            <h3>TREES</h3>
          </Grid>
        </Grid>

        <Grid item container xs={6} sm={3} flexDirection={'column'} alignItems={'center'}>
          <Grid item xs={12}>
            <IconButton color="primary" onClick={() => handleButtonClick("/logs")}>
              <WorkSpacesIcon style={{ fontSize: 50 }} />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <h3>LOGS</h3>
          </Grid>
        </Grid>
        <Grid item container xs={6} sm={3} flexDirection={'column'} alignItems={'center'}>
          <Grid item xs={12}>
            <IconButton color="primary" onClick={() => handleButtonClick("/planks")}>
              <ClearAll style={{ fontSize: 50 }} />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <h3>PLANKS</h3>
          </Grid>
        </Grid>
        <Grid item container xs={6} sm={3} flexDirection={'column'} alignItems={'center'}>
          <Grid item xs={12}>
            <IconButton color="primary" onClick={() => handleButtonClick("/water_crud")}>
              <WaterDropIcon style={{ fontSize: 50 }} />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <h3>WATER</h3>
          </Grid>
        </Grid>
      </Grid>
      </CustomBox>
      </CustomBox>
    </PageContentContainer>
  );
};

export default SecureHome;
