import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MyMapComponent from "./MapReport";
import {
  faQuoteLeft,
  faQuoteRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageContentContainer from "../../components/CustomBoxes/PageContentContainer";
import CustomBox from "../../components/CustomBoxes/CustomBoxes";
import { Alert, Box, Card, CardContent, CardMedia, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import CustomTypography from "../../components/Typography/CustomTypography";
import FullWidthImageContainer from '../../components/CustomBoxes/FullWidthImageContainer';
import { Container } from "react-bootstrap";

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
      <Alert severity="info">Demo Page — The final wood product will display a QR code linking to this page.</Alert>
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
              Transparent forestry involves understanding the origin of your
              wood and the circumstances surrounding its extraction from the forest.
            </CustomTypography.subheading>
          </Grid>
          <Grid item xs={12}>
            <CustomTypography.paragraph>
              You own {species}_{id}. It is unque. In this document we will share what we know.
            </CustomTypography.paragraph>
          </Grid>
          {/* <Card>
            <CardMedia component="img" height="200" image={treeImage} alt='tree_image' />
            <CardContent>
              <CustomTypography.paragraph>
                Taken on {formatDate(treeData.date)}
              </CustomTypography.paragraph>
            </CardContent>
          </Card> */}


        </Grid>
      </CustomBox>
      {/*TREE IMAGE & GPS MAP */}
      <Box p={1} sx={{ width: '100%',  display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    
      <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: '1' }}>
     
        {/*Select*/}
        <CustomTypography.heading>
          your tree
        </CustomTypography.heading>
      </Grid>

      <Grid Container style={{ maxWidth: '350px', flex: '1' }}>
      <Card>
        <Grid id='treeImage' item xs={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/*Tree Image */}
          <img src={treeImage} alt="Uploaded Image" height="500" style={{ }} />
        </Grid>
        </Card>
      </Grid>
     
    </Box>


    <MyMapComponent tree={treeData} />


      {/*TREE  IMAGE */}
    
      {/* Transparent Forestry */}
      <CustomBox variant="secondary">
        <Grid container spacing={1}>



          <Grid item xs={12}>
            <CustomTypography.subheading>
              Let's begin the journey.... Above is an image, taken on the day of felling, of the actual tree from which your product was produced.
            </CustomTypography.subheading>
          </Grid>
          <Grid item xs={12}>
            <CustomTypography.paragraph>
              The tree
              stood in a selective-cut forest in Selet, Vännäs, Umeå for {treeData.age} years.
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
          <Grid item xs={12}>
            <CustomTypography.paragraph>
              We record the GPS location of the tree as further transparency.

            </CustomTypography.paragraph>
            <MyMapComponent tree={treeData} />
          </Grid>
        </Grid>
      </CustomBox>
      <CustomBox>
        <Paper>
          <MyMapComponent tree={treeData} />
        </Paper>
      </CustomBox>

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
        <Grid item xs={12} paddingBottom={2} >
          <CustomTypography.heading>
            sawmill
          </CustomTypography.heading>
        </Grid>
        <Card >
          <Container >
            <Grid container spacing={3} paddingTop={2} paddingBottom={2}>

              <Grid item xs={12}>

                <TableContainer component={Paper} >
                  <Table size="small" aria-label="a dense table">
                    {/* Title Row */}
                    <TableHead >
                      <TableRow>
                        <TableCell >Mill Date</TableCell>
                        <TableCell>Operator</TableCell>
                        <TableCell>Log ID</TableCell>

                      </TableRow>
                    </TableHead>

                    {/* Entry Row */}
                    <TableBody>
                      <TableRow>
                        <TableCell>{plank.date}</TableCell>
                        <TableCell>{plank.operator}</TableCell>
                        <TableCell>{plank.log.tree.id}P{plank.log.id}</TableCell>

                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12}>
                <TableContainer component={Paper} >
                  <Table size="small" aria-label="a dense table">
                    {/* Title Row */}
                    <TableHead >
                      <TableRow>

                        <TableCell>Width</TableCell>
                        <TableCell>Depth</TableCell>
                        <TableCell>Length</TableCell>
                        <TableCell>Grade</TableCell>
                      </TableRow>
                    </TableHead>

                    {/* Entry Row */}
                    <TableBody>
                      <TableRow>

                        <TableCell>{formattedWidth}cm</TableCell>
                        <TableCell>{formattedDepth}cm</TableCell>
                        <TableCell>{formattedLength}cm</TableCell>
                        <TableCell>{plank.wood_grade}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                </TableContainer>


              </Grid>

              <Grid item xs={12}>

                <Paper >
                  <Container >
                    <Grid container xs={12}>
                      <Grid item xs={12} paddingBottom={1}>
                        <CustomTypography.subheading paddingTop={2}>
                          Notes from {plank.operator}:
                        </CustomTypography.subheading>
                      </Grid>
                      <Grid item xs={12} paddingBottom={2}>
                        <CustomTypography.paragraph >
                          <FontAwesomeIcon icon={faQuoteLeft} />
                          <p>{plank.info}</p>
                          <FontAwesomeIcon icon={faQuoteRight} />
                        </CustomTypography.paragraph>
                      </Grid>
                    </Grid>
                  </Container>
                </Paper>
              </Grid>
              <Grid item xs={12}>

                <Paper >
                  <Container >
                    <Grid container xs={12} spacing={1} paddingBottom={2} >
                      <Grid item xs={6}>
                        <img src={plank.image1} alt="Image 1" style={{ width: '100%', maxWidth: '150px' }} />
                      </Grid>
                      <Grid item xs={6}>
                        <img src={plank.image2} alt="Image 2" style={{ width: '100%', maxWidth: '150px' }} />
                      </Grid>
                    </Grid>
                  </Container>
                </Paper>
              </Grid>


            </Grid>
          </Container>
        </Card>

      </CustomBox>

      {/* Thank You */}
      <CustomBox variant="dark">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <CustomTypography.heading>
              Finally...thank you for caring!
            </CustomTypography.heading>
          </Grid>
          <Grid item xs={12}>
            <CustomTypography.subheading>
              It is essential that new wood products that come from an
              honest and sustainable source. Without honesty and transparency we cannot stop the world's climate problems.

            </CustomTypography.subheading>
          </Grid>
          <Grid item xs={12}>
            <CustomTypography.paragraph>
              Below you can read more about our project. Please continue to support the sawmill and forest
              owners that are actively striving to create a positive impact.

            </CustomTypography.paragraph>
          </Grid>
        </Grid>
      </CustomBox>
    </PageContentContainer >

  );
};

export default PlankReport;
