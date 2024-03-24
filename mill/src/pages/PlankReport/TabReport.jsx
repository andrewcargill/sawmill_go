import React, { useState } from "react";
import {
  AppBar,
  Paper,
  Tabs,
  Tab,
  Box,
  Container,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CustomTypography from "../../components/Typography/CustomTypography";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConstructionIcon from "@mui/icons-material/Construction";

const ForestTabContent = (props) => (
  <div>
    <Grid container paddingTop={2}>
      <Grid item xs={12} paddingBottom={2}>
        <CustomTypography.heading>Forest</CustomTypography.heading>
      </Grid>
    </Grid>
    <Container>
      <Grid container spacing={3} paddingTop={2} paddingBottom={2}>
        <Grid item xs={12}>
          {/* Mill Data 1 */}
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              {/* Title Row */}
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Operator</TableCell>
                  <TableCell>ID</TableCell>
                </TableRow>
              </TableHead>

              {/* Entry Row */}
              <TableBody>
                <TableRow>
                  <TableCell>{props.treeData.date}</TableCell>
                  <TableCell>{props.treeData.lumberjack}</TableCell>
                  <TableCell>{props.plank.log.tree.id}P</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12}>
          {/* Mill Data 2 */}
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              {/* Title Row */}
              <TableHead>
                <TableRow>
                  <TableCell>Lat</TableCell>
                  <TableCell>Lon</TableCell>
                </TableRow>
              </TableHead>
              {/* Entry Row */}
              <TableBody>
                <TableRow>
                  <TableCell>
                    {Number(props.treeData.latitude).toFixed(5)}
                  </TableCell>
                  <TableCell>
                    {Number(props.treeData.longitude).toFixed(5)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          {/* Quote */}
          <Paper>
            <Container>
              <Grid container xs={12}>
                <Grid item xs={12} paddingBottom={1}>
                  <CustomTypography.subheading paddingTop={2}>
                    Notes from {props.plank.operator}:
                  </CustomTypography.subheading>
                </Grid>
                <Grid item xs={12} paddingBottom={2}>
                  <CustomTypography.paragraph>
                    <FontAwesomeIcon icon={faQuoteLeft} />
                    <p>{props.treeData.reason_for_felling}</p>
                    <FontAwesomeIcon icon={faQuoteRight} />
                  </CustomTypography.paragraph>
                </Grid>
              </Grid>
            </Container>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  </div>
);
const SawmillTabContent = (props) => (
  <div>
    <Grid container paddingTop={2}>
      <Grid item xs={12} paddingBottom={2}>
        <CustomTypography.heading>sawmill</CustomTypography.heading>
      </Grid>

      <Container>
        <Grid container spacing={3} paddingTop={2} paddingBottom={2}>
          <Grid item xs={12}>
            {/* Mill Data 1 */}
            <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                {/* Title Row */}
                <TableHead>
                  <TableRow>
                    <TableCell>Mill Date</TableCell>
                    <TableCell>Operator</TableCell>
                    <TableCell>Log ID</TableCell>
                  </TableRow>
                </TableHead>

                {/* Entry Row */}
                <TableBody>
                  <TableRow>
                    <TableCell>{props.plank.date}</TableCell>
                    <TableCell>{props.plank.operator}</TableCell>
                    <TableCell>
                      {props.plank.log.tree.id}P{props.plank.log.id}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12}>
            {/* Mill Data 2 */}
            <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                {/* Title Row */}
                <TableHead>
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
                    <TableCell>{props.formattedWidth}cm</TableCell>
                    <TableCell>{props.formattedDepth}cm</TableCell>
                    <TableCell>{props.formattedLength}cm</TableCell>
                    <TableCell>{props.plank.wood_grade}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12}>
            {/* Quote */}
            <Paper>
              <Container>
                <Grid container xs={12}>
                  <Grid item xs={12} paddingBottom={1}>
                    <CustomTypography.subheading paddingTop={2}>
                      Notes from {props.plank.operator}:
                    </CustomTypography.subheading>
                  </Grid>
                  <Grid item xs={12} paddingBottom={2}>
                    <CustomTypography.paragraph>
                      <FontAwesomeIcon icon={faQuoteLeft} />
                      <p>{props.plank.info}</p>
                      <FontAwesomeIcon icon={faQuoteRight} />
                    </CustomTypography.paragraph>
                  </Grid>
                </Grid>
              </Container>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            {/* Images */}
            <Paper>
              <Container>
                <Grid container xs={12} spacing={1} paddingBottom={2}>
                  <Grid item xs={6}>
                    <img
                      src={props.plank.image1}
                      alt="Image 1"
                      style={{ width: "100%", maxWidth: "150px" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <img
                      src={props.plank.image2}
                      alt="Image 2"
                      style={{ width: "100%", maxWidth: "150px" }}
                    />
                  </Grid>
                </Grid>
              </Container>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  </div>
);

const WoodshopTabContent = () => (
  <div>
    <Grid container paddingTop={2} height={400}>
      <Grid item xs={12} paddingBottom={2}>
        <CustomTypography.heading>Woodshop</CustomTypography.heading>
        <Grid container pt={2}>
          <Grid pr={1}>
            {" "}
            <ConstructionIcon />{" "}
          </Grid>
          <Grid> This module is under development</Grid>
        </Grid>
      </Grid>
    </Grid>
  </div>
);
const TabPanel = (props) => {
  const { children, value, index, treeData, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>{React.cloneElement(children, { treeData })}</Box>
      )}
    </div>
  );
};

const TabReport = (props) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  console.log("tab report - props:", props);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <AppBar
        position="static"
        style={{ backgroundColor: theme.palette.white.main }}
      >
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Forest" />
          <Tab label="Sawmill" />
          <Tab label="Woodshop" />
        </Tabs>
      </AppBar>
      <TabPanel
        value={value}
        index={0}
        treeData={props.treeData}
        textColor={theme.palette.primary.contrastText}
        indicatorColor={theme.palette.white.main}
      >
        <ForestTabContent
          treeData={props.treeData}
          plank={props.plank}
          formattedWidth={props.formattedWidth}
          formattedLength={props.formattedLength}
          formattedDepth={props.formattedDepth}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SawmillTabContent
          plank={props.plank}
          formattedWidth={props.formattedWidth}
          formattedLength={props.formattedLength}
          formattedDepth={props.formattedDepth}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <WoodshopTabContent />
      </TabPanel>
    </Container>
  );
};

export default TabReport;
