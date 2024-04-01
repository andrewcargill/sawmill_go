import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MyMapComponent from "./MapReport";
import PageContentContainer from "../../components/CustomBoxes/PageContentContainer";
import CustomBox from "../../components/CustomBoxes/CustomBoxes";
import { Alert, Box, Card, Grid, Paper } from "@mui/material";
import CustomTypography from "../../components/Typography/CustomTypography";
import TabReport from "./TabReport";
import board1 from "../../media/images/board1.png";
import board2 from "../../media/images/board2.png";
import board3 from "../../media/images/board3.png";
import FingerprintIcon from "@mui/icons-material/Fingerprint";

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

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlank = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/plank/report/${id}/`,
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

  const formatDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = new Date(date).toLocaleDateString(undefined, options);
    return formattedDate.replace(
      /\b(\d{1,2})\b/g,
      (match, day) => day + getDayOrdinalSuffix(day)
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

  const treeName = `${species}_${id}`;

  const formattedDepth = Number(plank.depth).toString();
  const formattedWidth = Number(plank.width).toString();
  const formattedLength = Number(log.length).toString();

  return (
    <PageContentContainer>
      {/* Header */}
      {/* START MARKER */}

      <Grid container bgcolor={"secondary.main"}>
        <Grid container pt={2} justifyContent={"flex-end"}>
          <Grid
            container
            xs={6}
            item
            spacing={1}
            p={5}
            style={{
              borderRadius: "30px 0 0 30px",
              backgroundColor: "black",
              color: "white",
            }}
          >
            <Grid item xs={12}>
              <CustomTypography.heading>INTRODUCTION</CustomTypography.heading>
            </Grid>
          </Grid>
        </Grid>

        {/* SPACER */}
        <Grid container height={"5vh"} spacing={1} xs={6}></Grid>

        {/* PRIDE OF OWNERSHIP */}
        <Grid container spacing={1} xs={7}>
          <CustomBox variant="primary">
            <Grid container spacing={1}>
              <Grid item xs={12} pb={4}>
                <CustomTypography.heading>
                  Pride of Ownership
                </CustomTypography.heading>
              </Grid>
              <Grid item xs={12} pb={4}>
                <CustomTypography.subheading>
                  Transparent forestry involves understanding the origin of your
                  wood and the circumstances surrounding its extraction from the
                  forest. You own {species}_{id}. It is unque. In this document
                  we will the journey.
                </CustomTypography.subheading>
              </Grid>

              <Grid item xs={12} pb={4}>
                <CustomTypography.paragraph>
                  Trees are the lungs of the earth. They are the source of life
                  and the source of wood. Sustainable and transparent forestry
                  is the only way to ensure that we can continue to enjoy the
                  benefits of wood products. We believe in small scale, local
                  forestry. We believe in the power of the individual to make a
                  difference. We believe in the power of the individual to make
                  a difference. Selective cutting is the only way to ensure that
                  the forest remains healthy and that the trees can continue to
                  grow.
                </CustomTypography.paragraph>
              </Grid>
              <Grid item container xs={12} pb={4}>
                <Grid item xs={12}>
                  <FingerprintIcon color="secondary" style={{ fontSize: 50 }} />{" "}
                  SAWMILL GO!
                </Grid>
              </Grid>
            </Grid>
          </CustomBox>
        </Grid>

        <Grid container m={-3} justifyContent={"flex-end"}>
          <Grid item container xs={7} bgcolor={"dark.main"} p={3}>
            <Grid container spacing={1}>
              <Grid
                item
                xs={4}
                style={{ width: "100%", height: "200px", position: "relative" }}
              >
                <div
                  style={{ width: "100%", height: "100%", overflow: "hidden" }}
                >
                  <img
                    src={board1}
                    alt="Uploaded Image"
                    style={{
                      height: "100%",
                      width: "auto",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              </Grid>
              <Grid
                item
                xs={4}
                style={{ width: "100%", height: "200px", position: "relative" }}
              >
                <div
                  style={{ width: "100%", height: "100%", overflow: "hidden" }}
                >
                  <img
                    src={board2}
                    alt="Uploaded Image"
                    style={{
                      height: "100%",
                      width: "auto",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              </Grid>
              <Grid
                item
                xs={4}
                style={{ width: "100%", height: "200px", position: "relative" }}
              >
                <div
                  style={{ width: "100%", height: "100%", overflow: "hidden" }}
                >
                  <img
                    src={board3}
                    alt="Uploaded Image"
                    style={{
                      height: "100%",
                      width: "auto",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* SPACER */}
        <Grid container height={"5vh"} spacing={1} xs={6}></Grid>
      </Grid>

      <Grid container bgcolor={'primary.main'}>
        {/* ORIGIN TREE MARKER */}
        <Grid container pt={2} justifyContent={"flex-end"}>
          <Grid
            container
            xs={6}
            item
            spacing={1}
            p={5}
            style={{
              borderRadius: "30px 0 0 30px",
              backgroundColor: "black",
              color: "white",
            }}
          >
            <Grid item xs={12}>
              <CustomTypography.heading>
                THE ORIGIN: THE TREE
              </CustomTypography.heading>
            </Grid>
          </Grid>
        </Grid>

        {/* SPACER */}
        <Grid container height={"5vh"} spacing={1} xs={6}></Grid>
        <Grid container justifyContent={'flex-end'} mr={6} >
        <Grid container item spacing={1} xs={8}>
          <CustomBox variant="white">
            <Grid container spacing={1}>
              <Grid item xs={12} pb={4}>
                <CustomTypography.heading>
                  {formatDate(treeData.date)}
                </CustomTypography.heading>
              </Grid>
              <Grid item xs={12} pb={4}>
                <CustomTypography.subheading>
                  Transparent forestry involves understanding the origin of your
                  wood and the circumstances surrounding its extraction from the
                  forest.
                </CustomTypography.subheading>
              </Grid>
              <Grid item xs={12} pb={4}>
                <CustomTypography.paragraph>
                  You own {species}_{id}. It is unque. In this document we will
                  share what we know.
                </CustomTypography.paragraph>
              </Grid>
            </Grid>
          </CustomBox>
        </Grid>
        </Grid>

        <Grid container m={-3} justifyContent={"flex-start"}>
          <Grid
            item
            container
            xs={4}
            ml={7}
            borderRadius={"15px"}
            bgcolor={"secondary.main"}
            p={3}
          >
            <Grid container spacing={1}>
              <Grid
                item
                xs={12}
                style={{ width: "100%", height: "400px", position: "relative" }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={treeImage}
                    alt="Uploaded Image"
                    style={{
                      height: "120%",
                      width: "auto",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* SPACER */}
        <Grid container height={"5vh"} spacing={1} xs={6}></Grid>

        {/*TREE IMAGE & GPS MAP */}

        {/* SPACER */}
        <Grid container height={"5vh"} spacing={1} xs={6}></Grid>
      </Grid>

      <CustomBox>
        <Paper>
          <MyMapComponent tree={treeData} sx={{ maxWidth: "500px" }} />
        </Paper>
      </CustomBox>
      {/* SPACER */}
      <Grid container height={"5vh"} spacing={1} xs={6}></Grid>

      <Grid container bgcolor={'secondary.main'}>
      {/* LOGGING MARKER */}
      <Grid container pt={2} justifyContent={"flex-end"}>
        <Grid
          container
          xs={7}
          item
          spacing={1}
          p={5}
          style={{
            borderRadius: "30px 0 0 30px",
            backgroundColor: "black",
            color: "white",
          }}
        >
          <Grid item xs={12}>
            <CustomTypography.heading>
              THE JOURNEY: LOGGING
            </CustomTypography.heading>
          </Grid>
        </Grid>
      </Grid>

      {/* SPACER */}
      <Grid container height={"5vh"} spacing={1} xs={6}></Grid>

      {/* LOGGING FACTS */}
      <Grid container spacing={1} xs={7}>
        <CustomBox variant="primary">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <CustomTypography.heading>
                {formatDate(log.date)}
              </CustomTypography.heading>
            </Grid>
            <Grid item xs={12}>
              <CustomTypography.subheading>
                Transparent forestry involves understanding the origin of your
                wood and the circumstances surrounding its extraction from the
                forest. You own {species}_{id}. It is unque. In this document we
                will the journey.
              </CustomTypography.subheading>
            </Grid>

            <Grid item xs={12}>
              <CustomTypography.paragraph>
                Trees are the lungs of the earth. They are the source of life
                and the source of wood. Sustainable and transparent forestry is
                the only way to ensure that we can continue to enjoy the
                benefits of wood products. We believe in small scale, local
                forestry. We believe in the power of the individual to make a
                difference. We believe in the power of the individual to make a
                difference. Selective cutting is the only way to ensure that the
                forest remains healthy and that the trees can continue to grow.
              </CustomTypography.paragraph>
            </Grid>
          </Grid>
        </CustomBox>
      </Grid>

      {/* SPACER */}
      <Grid container height={"5vh"} spacing={1} xs={6}></Grid>
    </Grid>
      {/* MILLING MARKER */}
      <Grid container pt={2} justifyContent={"flex-end"}>
        <Grid
          container
          xs={9}
          item
          spacing={1}
          p={5}
          style={{
            borderRadius: "30px 0 0 30px",
            backgroundColor: "black",
            color: "white",
          }}
        >
          <Grid item xs={12}>
            <CustomTypography.heading>
              TRANSFORMATION: MILLING
            </CustomTypography.heading>
          </Grid>
        </Grid>
      </Grid>

      {/* SPACER */}
      <Grid container height={"5vh"} spacing={1} xs={6}></Grid>

      <Grid container spacing={1} xs={8} justifySelf={"flex-end"}>
        <CustomBox variant="dark">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <CustomTypography.heading>
                {formatDate(plank.date)}
              </CustomTypography.heading>
            </Grid>
            <Grid item xs={12}>
              <CustomTypography.subheading>
                Transparent forestry involves understanding the origin of your
                wood and the circumstances surrounding its extraction from the
                forest.
              </CustomTypography.subheading>
            </Grid>
            <Grid item xs={12}>
              <CustomTypography.paragraph>
                You own {species}_{id}. It is unque. In this document we will
                share what we know.
              </CustomTypography.paragraph>
            </Grid>
          </Grid>
        </CustomBox>
      </Grid>

      {/* SPACER */}
      <Grid container height={"5vh"} spacing={1} xs={6}></Grid>

      {/* END PRODUCT MARKER */}
      <Grid container pt={2} justifyContent={"flex-end"}>
        <Grid
          container
          xs={5}
          item
          spacing={1}
          p={5}
          style={{
            borderRadius: "30px 0 0 30px",
            backgroundColor: "black",
            color: "white",
          }}
        >
          <Grid item xs={12}>
            <CustomTypography.heading>THE END PRODUCT</CustomTypography.heading>
          </Grid>
        </Grid>
      </Grid>

      {/* SPACER */}
      <Grid container height={"5vh"} spacing={1} xs={6}></Grid>

      {/* LOGGING FACTS */}
      <Grid container spacing={1} xs={7}>
        <CustomBox variant="primary">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <CustomTypography.heading>END PRODUCT</CustomTypography.heading>
            </Grid>
            <Grid item xs={12}>
              <CustomTypography.subheading>
                Transparent forestry involves understanding the origin of your
                wood and the circumstances surrounding its extraction from the
                forest. You own {species}_{id}. It is unque. In this document we
                will the journey.
              </CustomTypography.subheading>
            </Grid>

            <Grid item xs={12}>
              <CustomTypography.paragraph>
                Trees are the lungs of the earth. They are the source of life
                and the source of wood. Sustainable and transparent forestry is
                the only way to ensure that we can continue to enjoy the
                benefits of wood products. We believe in small scale, local
                forestry. We believe in the power of the individual to make a
                difference. We believe in the power of the individual to make a
                difference. Selective cutting is the only way to ensure that the
                forest remains healthy and that the trees can continue to grow.
              </CustomTypography.paragraph>
            </Grid>
          </Grid>
        </CustomBox>
      </Grid>

      {/* SPACER */}
      <Grid container height={"5vh"} spacing={1} xs={6}></Grid>

      {/* Transparent Forestry */}
      <CustomBox variant="secondary" marginBottom={2}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <CustomTypography.subheading>
              Let's begin the journey.... Above is an image, taken on the day of
              felling, of the actual tree from which your product was produced.
            </CustomTypography.subheading>
          </Grid>
          <Grid item xs={12}>
            <CustomTypography.paragraph>
              The tree stood in a selective-cut forest in Selet, Vännäs, Umeå
              for {treeData.age} years.
            </CustomTypography.paragraph>
          </Grid>
          <Grid item xs={12}>
            <CustomTypography.paragraph>
              The tree was removed on{" "}
              <span className="highlight-one">
                {" "}
                {formatDate(treeData.date)}
              </span>{" "}
              by lumberjack {treeData.lumberjack}.
            </CustomTypography.paragraph>
          </Grid>
        </Grid>
      </CustomBox>

      {/* Add Tabs */}
      <TabReport
        treeData={treeData}
        plank={plank}
        formatDate={formatDate}
        formattedDepth={formattedDepth}
        formattedLength={formattedLength}
        formattedWidth={formattedWidth}
      />

      {/* Thank You */}
      <CustomBox variant="dark" mb={10}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <CustomTypography.heading>
              Finally...thank you for caring!
            </CustomTypography.heading>
          </Grid>
          <Grid item xs={12}>
            <CustomTypography.subheading>
              It is essential that new wood products that come from an honest
              and sustainable source. Without honesty and transparency we cannot
              stop the world's climate problems.
            </CustomTypography.subheading>
          </Grid>
          <Grid item xs={12}>
            <CustomTypography.paragraph>
              Below you can read more about our project. Please continue to
              support the sawmill and forest owners that are actively striving
              to create a positive impact.
            </CustomTypography.paragraph>
          </Grid>
        </Grid>
      </CustomBox>
    </PageContentContainer>
  );
};

export default PlankReport;
