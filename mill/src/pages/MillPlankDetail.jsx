import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Table } from "react-bootstrap";
import WaterByPlank from "../components/WaterByPlank";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

import PageContentContainer from "../components/CustomBoxes/PageContentContainer";
import { Chip, Dialog, DialogContent, Grid, Typography } from "@mui/material";
import CustomHeaderWithNavEdit from "../components/CustomFormHeaders/CustomHeaderWithNavEdit";
import PlankSiblings from "./ListViews/Plank/Components/PlankSiblings";
import LoadingSpinner from "../components/ApiDataComponents/LoadingSpinner";

const PlankDetail = () => {
  const { id } = useParams();
  const [plank, setPlank] = useState(null);
  const [length, setLength] = useState(null);
  const [species, setSpecies] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openImage2, setOpenImage2] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlank = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/plank/${id}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setPlank(response.data);
        setLength(response.data.log.length);
        setSpecies(response.data.log.tree.species);
      } catch (error) {
        console.error("Error fetching plank:", error);
      }
    };

    fetchPlank();
  }, [id]);

  // if (!plank) {
  //   return <p>Loading...</p>;
  // }

  const getLiveEdgeStatus = (live_edge) => {
    return live_edge ? <DoneIcon /> : <CloseIcon />;
  };

  const getFurnitureStatus = (furniture) => {
    return furniture ? <DoneIcon /> : <CloseIcon />;
  };

  const getStructuralStatus = (structural) => {
    return structural ? <DoneIcon /> : <CloseIcon />;
  };

  const getGeneralStatus = (general) => {
    return general ? <DoneIcon /> : <CloseIcon />;
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEditClick = () => {
    navigate(`/plank/${id}/edit`);
  };

  const handleLogClick = () => {
    navigate(`/log/${plank.log.id}`);
  };

  const handleTreeClick = () => {
    navigate(`/tree/${plank.log.tree.id}`);
  };

  const handleReportClick = () => {
    navigate(`/report/${plank.id}`);
  };

  //Image Dialog
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  const handleOpenImage2 = () => setOpenImage2(true);
  const handleCloseImage2 = () => setOpenImage2(false);

  const calculateWidthPercentage = (width) => {
    const minWidth = 2;
    const maxWidth = 25;
    const minPercentage = 40;
    const maxPercentage = 250;

    if (width <= minWidth) return `${minPercentage}px`;
    if (width >= maxWidth) return `${maxPercentage}px`;

    const percentage =
      minPercentage +
      ((width - minWidth) / (maxWidth - minWidth)) *
        (maxPercentage - minPercentage);
    return `${percentage}px`;
  };

  const calculateHeight = (depth) => {
    const minDepth = 2;
    const maxDepth = 25;
    const minHeight = 40;
    const maxHeight = 250;

    if (depth <= minDepth) return `${minHeight}px`;
    if (depth >= maxDepth) return `${maxHeight}px`;

    const height =
      minHeight +
      ((depth - minDepth) / (maxDepth - minDepth)) * (maxHeight - minHeight);
    return `${height}px`;
  };

  return (
    <PageContentContainer>
      <Grid Container>
        <CustomHeaderWithNavEdit
          title={`Plank ${id}`}
          handleGoBack={handleGoBack}
          handleEditClick={handleEditClick}
        />

        {plank ? (
        
        <Grid item container xs={12} pt={2}>
          <Grid item container md={6} xs={12}
            p={10}
            justifyContent={"center"}
            alignContent={"space-between"}
            bgcolor={"dark.contrastText"}
          >
            {/* Height */}
            <Grid item container xs={4}>
              <Grid
                item
                container
                p={1}
                pt={4}
                alignContent={"center"}
                justifyContent={"flex-end"}
                color={"dark.main"}
              >
                {plank.depth}cm
              </Grid>
            </Grid>
            {/* Width & Box */}
            <Grid item container xs={6}>
              <Grid item container color={"dark.main"} pl={1}>
                {plank.width}cm
              </Grid>
              <Grid
                bgcolor={"secondary.main"}
                item
                container
                borderRadius={"5px"}
                style={{
                  height: calculateHeight(plank?.depth),
                  width: calculateWidthPercentage(plank?.width),
                  border: "1px solid black",
                }}
              ></Grid>
            </Grid>

            {/* Length */}
            <Grid
              item
              container
              xs={23}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Grid
                item
                container
                alignContent={"center"}
                justifyContent={"flex-start"}
                pl={1}
                pt={2}
                color={"dark.main"}
              >
                {length}cm
              </Grid>
              <Grid
                item
                container
                borderRadius={"5px"}
                bgcolor={"secondary.main"}
                style={{
                  height: "30px",
                  width: "1000px",
                  border: "1px solid black",
                }}
              ></Grid>
            </Grid>
          </Grid>

          <Grid item container md={6} xs={12}>
            <Table bordered>
              <tbody>
                <tr>
                  <th>Date Milled:</th>
                  <td>{plank.date}</td>
                </tr>

                <tr>
                  <th>Species:</th>
                  <td>{species}</td>
                </tr>
                <tr>
                  <th>Grade:</th>
                  <td>{plank.wood_grade}</td>
                </tr>
                <tr>
                  <th>Log ID:</th>

                  <td>
                    <Chip
                      label={plank.log.id}
                      onClick={handleLogClick}
                      color="dark"
                    />
                  </td>
                </tr>
                <tr>
                  <th>Tree ID:</th>

                  <td>
                    <Chip
                      label={plank.log.tree.id}
                      onClick={handleTreeClick}
                      color="dark"
                    />
                  </td>
                </tr>

                <tr>
                  <th>Operator:</th>
                  <td>{plank.operator}</td>
                </tr>
                <tr>
                  <th>Story Document</th>
                  <td>
                    <Chip
                      label="View Report"
                      color="dark"
                      onClick={handleReportClick}
                    />
                  </td>
                </tr>
                <tr>
                <td colSpan={2}>
                  <strong>Categories:</strong>

                  <Grid container xs={12} p={1}>
                    <Grid item container lg={3} sm={3} xs={6}>
                      <p>Live-Edge: {getLiveEdgeStatus(plank?.live_edge)}</p>
                    </Grid>
                    <Grid item container lg={3} sm={3} xs={6}>
                      <p>Furniture: {getFurnitureStatus(plank?.furniture)}</p>
                    </Grid>
                    <Grid item container lg={3} sm={3} xs={6}>
                      <p>
                        Structural: {getStructuralStatus(plank?.structural)}
                      </p>
                    </Grid>
                    <Grid item container lg={3} sm={3} xs={6}>
                      <p>General: {getGeneralStatus(plank?.general)}</p>
                    </Grid>
                  </Grid>
                </td>
              </tr>
              </tbody>
            </Table>
          </Grid>

          <Table bordered>
            <tbody>
              <tr>
                <td colSpan={2}>
                  <strong>Operator's notes:</strong>
                  <p>{plank.info}</p>
                </td>
              </tr>
            </tbody>
          </Table>
          <Table bordered>
              <tbody>
              <tr>
                <td colSpan={2}>
                  <strong>Siblings:</strong>  <Typography color={'#79c001'}>*Book-Matched</Typography>
                  <PlankSiblings currentPlank={plank.id} logId={plank.log.id} />
                </td>
              </tr>
            </tbody>
          </Table>
          <Table bordered>
            <tbody>
              
              <Grid item container xs={12}>
                <Grid
                  item
                  container
                  xs={6}
                  onClick={plank.image1 ? handleOpenDialog : undefined}
                  style={{ cursor: plank.image1 ? "pointer" : "default" }}
                >
                  <td colSpan={2}>
            
                    {plank.image1 && (
                      <img
                        src={plank.image1}
                        alt="Tree Image"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    )}
                  </td>
                </Grid>
                <Grid
                  item
                  container
                  xs={6}
                  onClick={plank.image2 ? handleOpenImage2 : undefined}
                  style={{ cursor: plank.image2 ? "pointer" : "default" }}
                >
                  <td colSpan={2}>
                    
                    {plank.image2 && (
                      <img
                        src={plank.image2}
                        alt="Tree Image"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    )}
                  </td>
                </Grid>
              </Grid>
              <tr>
                <td colSpan={2}>
                  <strong>Moisture Checks:</strong>

                  <div>
                    <WaterByPlank plankId={id} />
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            maxWidth="lg"
            aria-labelledby="image-dialog-title"
          >
            <DialogContent
              onClick={handleCloseDialog}
              style={{ cursor: "pointer" }}
            >
              {plank.image1 && (
                <img
                  src={plank.image1}
                  alt="Plank Image"
                  style={{ maxWidth: "80vh", height: "auto" }}
                />
              )}
            </DialogContent>
          </Dialog>

          <Dialog
            open={openImage2}
            onClose={handleCloseImage2}
            maxWidth="lg"
            aria-labelledby="image-dialog-title"
          >
            <DialogContent
              onClick={handleCloseImage2}
              style={{ cursor: "pointer" }}
            >
              {plank.image1 && (
                <img
                  src={plank.image2}
                  alt="Plank Image Two"
                  style={{ maxWidth: "80vh", height: "auto" }}
                />
              )}
            </DialogContent>
          </Dialog>
        </Grid>
        ) : (
          <Grid item container xs={12} p={2}>
            <LoadingSpinner />
          </Grid>
        )}
      </Grid>
    </PageContentContainer>
  );
};

export default PlankDetail;
