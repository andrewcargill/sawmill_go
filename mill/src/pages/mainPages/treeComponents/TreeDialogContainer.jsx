import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Tab,
  Table,
} from "@mui/material";
import React, { useState } from "react";
import { Tabs } from "react-bootstrap";
import TreeInfo from "./TreeInfo";
import LogInfo from "./LogInfo";
import TreeImage from "./TreeImage";
import TreeLocation from "./TreeLocation";
import InfoIcon from "@mui/icons-material/Info";
import { DateRangeIcon } from "@mui/x-date-pickers";


const TreeDialogContainer = ({ tree }) => {




  return (
    <Box>
      <Grid
        container
        bgcolor={"red"}
        width={"100%"}
        height={"50vh"}
        alignItems={"flex-start"}
        justifyContent={"center"}
      >
        <AppBar position="static" color="white" style={{ height: "100%" }}>
          <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3"
          >


            <Tab title="Info"  eventKey="home" >
              <TreeInfo tree={tree} />
            </Tab>
           
            <Tab eventKey="image" title="Image">
                <TreeImage tree={tree} />
            </Tab>
            <Tab eventKey="gps" title="Gps">
                <TreeLocation tree={tree} />
            </Tab>
            <Tab eventKey="logs" title="Logs">
                <LogInfo tree={tree} />
            </Tab>
  
          </Tabs>
        </AppBar>
      </Grid>
    </Box>
  );
};

export default TreeDialogContainer;
