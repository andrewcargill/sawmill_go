import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import css from "../../styles/testApiGps.module.css";
import styles from "../../styles/PlankReport.module.css";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Nav,
  Image,
  Tab,
} from "react-bootstrap";

import MyMapComponent from "./MapReport";
import {
  faQuoteLeft,
  faQuoteRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageContentContainer from "../../components/CustomBoxes/PageContentContainer";
import CustomBox from "../../components/CustomBoxes/CustomBoxes";
import { Grid } from "@mui/material";
import CustomTypography from "../../components/Typography/CustomTypography";
import CustomButton from "../../components/Buttons/CustomButtons";

const PlankReport = () => {
  const { id } = useParams();
  const [plank, setPlank] = useState(null);
  const [length, setLength] = useState(null);
  const [treeId, setTreeId] = useState(null);
  const [treeDate, setTreeDate] = useState(null);
  const [reason_for_felling, setReason_for_felling] = useState(null);
  const [age, setAge] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [lumberjack, setLumberjack] = useState(null);
  const [treeImage, setTreeImage] = useState(null);
  const [species, setSpecies] = useState(null);
  const [log, setLog] = useState([]);
  const [treeData, setTreeData] = useState([]);

  const [activeTab, setActiveTab] = useState("about");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlank = async () => {
      try {
        const response = await axios.get(
          `https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/plank/report/${id}/`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("image", response.data);
        setPlank(response.data);

        setLength(response.data.log.length);
        setLog(response.data.log);
        setTreeDate(response.data.log.tree.date);
        setSpecies(response.data.log.tree.species);
        setReason_for_felling(response.data.log.tree.reason_for_felling);
        setAge(response.data.log.tree.age);
        setLongitude(response.data.log.tree.longitude);
        setLatitude(response.data.log.tree.latitude);
        setLumberjack(response.data.log.tree.lumberjack);
        setTreeImage(response.data.log.tree.image);
        setTreeId(response.data.log.tree.id);
        setTreeData(response.data.log.tree);

        console.log("treeData", treeData);
        console.log("logData", log);
        console.log("response.data", response.data);
      } catch (error) {
        console.error("Error fetching plank:", error);
      }
    };

    fetchPlank();
  }, [id]);

  if (!plank) {
    return <p>Loading...</p>;
  }

  const getLiveEdgeStatus = (live_edge) => {
    return live_edge ? "Yes" : "No";
  };

  const getFurnitureStatus = (furniture) => {
    return furniture ? "Yes" : "No";
  };

  const getStructuralStatus = (structural) => {
    return structural ? "Yes" : "No";
  };

  const getGeneralStatus = (general) => {
    return general ? "Yes" : "No";
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleTabSelect = (tab) => {
    console.log(activeTab);
    setActiveTab(tab);
  };

  const formatDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(date).toLocaleDateString(undefined, options);
    return formattedDate.replace(/\b(\d{1,2})\b/g, (match, day) =>
      day + getDayOrdinalSuffix(day)
    );
  };

  const getDayOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const treeName = `${species}_${id}`

  const formattedDepth = Number(plank.depth).toString();
  const formattedWidth = Number(plank.width).toString();
  const formattedLength = Number(log.length).toString();



  return (



  
    < PageContentContainer >
    {/* Header */}
    <CustomBox variant="primary">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <CustomTypography.heading>
            Life Cycle of Wood Product {species}_{id}
          </CustomTypography.heading>
        </Grid>
        <Grid item xs={12}>
          <CustomTypography.subheading>
            {/* Empower Your Artisanal Sawmill with Sawmill Go - The Ultimate Database Solution! */}
            My ongoing personal API and Frontend project for Artisan Sawmill Owners!
          </CustomTypography.subheading>
        </Grid>
        <Grid item xs={12}>
          <CustomTypography.paragraph>
            {/* Seamlessly manage your inventory operations with ease. From start to finish, experience smooth and hassle-free management, allowing artisans to effortlessly oversee their operations. */}
            I own a sawmill and forests in the North of Sweden and had the need for an inventory management system.
          </CustomTypography.paragraph>
        </Grid>
        <Grid item xs={12}>
          <CustomTypography.paragraph>
            {/* Seamlessly manage your inventory operations with ease. From start to finish, experience smooth and hassle-free management, allowing artisans to effortlessly oversee their operations. */}
            Forestry done well is great for the enviroment. For the last few years I have wanted to create a system that delivers a transparent process, from the tree in the forest, to
            the customer. This is what is at the heart of Sawmill Go.
          </CustomTypography.paragraph>
        </Grid>

      </Grid>
    </CustomBox>
    {/* IMAGE */}

    {/* Transparent Forestry */}
    <CustomBox variant="secondary">
      <Grid container spacing={1}>
        
        <Grid item xs={12}>
          <CustomTypography.subheading>
            Transparent forestry involves understanding the origin of your 
        wood and the circumstances surrounding its extraction from the forest
          </CustomTypography.subheading>
        </Grid>
        <Grid item xs={12}>
          <CustomTypography.paragraph>
           You own {species}_{id}. It is unque. In this document we will share what we know. The tree
          stood in a selective-cut forest in Selet, Vännäs, Umeå for {treeData.age}.
          </CustomTypography.paragraph>
        </Grid>
        <Grid item xs={12}>
          <CustomTypography.paragraph>
          The tree was removed on <span className="highlight-one"> {formatDate(treeData.date)}</span> by lumberjack{" "}
          {treeData.lumberjack}.
          </CustomTypography.paragraph>
        </Grid>
      </Grid>
    </CustomBox>

    {/* Reason for felling */}
    <CustomBox variant="white">
      <Grid container spacing={1}>
      <Grid item xs={12}>
          <CustomTypography.heading>
          the reason for felling <span> {species}_{id}</span>
          </CustomTypography.heading>
        </Grid>
        <Grid item xs={12}>
          <CustomTypography.subheading>
          <FontAwesomeIcon icon={faQuoteLeft} />
           <p>{treeData.reason_for_felling}</p>
          <FontAwesomeIcon icon={faQuoteRight} />
          </CustomTypography.subheading>
        </Grid>
        </Grid>
    </CustomBox>
    <MyMapComponent tree={treeData}/>
    {/* Milling */}
    <CustomBox variant="primary">
      <Grid container spacing={1}>
      <Grid item xs={12}>
          <CustomTypography.heading>
          Milling of <span> {species}_{id}</span>
          </CustomTypography.heading>
        </Grid>
        <Grid item xs={12}>
          <CustomTypography.subheading>
          {treeName} was milled from a log (REF:{plank.log.tree.id}_{plank.log.id}) on {formatDate(plank.date)} by {plank.operator} at Selet15 sawmills.
          </CustomTypography.subheading>
        </Grid>
        </Grid>
    </CustomBox>
    {/* Milling Notes - ADD PAPER CONTAINER */}
    <CustomBox variant="white">
      <Grid container spacing={1}>
      <Grid item xs={12}>
          <CustomTypography.heading>
          Notes from the sawmill
          </CustomTypography.heading>
        </Grid>
        <Grid item xs={12}>
          <CustomTypography.subheading>
          The cut dimensions were: {formattedDepth} x {formattedWidth} x {formattedLength}cm. 
          Wood is graded, with 1 being the highest standard. {treeName} was graded: {plank.wood_grade}. The following notes were added on milling: 
          </CustomTypography.subheading>
        </Grid>
        <Grid item xs={12}>
          <CustomTypography.subheading>
          <FontAwesomeIcon icon={faQuoteLeft} />
           <p>{plank.info}</p>
          <FontAwesomeIcon icon={faQuoteRight} />
          </CustomTypography.subheading>
        </Grid>
        </Grid>
    </CustomBox>
      </PageContentContainer >

  );
};

export default PlankReport;
