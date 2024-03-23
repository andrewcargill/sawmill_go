import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleMapReact from "google-map-react";
import css from "../styles/testApiGps.module.css";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import LogsByTree from "../components/LogsbyTree";
import WaterByPlank from "../components/WaterByPlank";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

import {
  faLeftLong,
  faPenToSquare,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageContentContainer from "../components/CustomBoxes/PageContentContainer";
import { Chip, Dialog, DialogContent, Grid } from "@mui/material";
import CustomHeaderWithNavEdit from "../components/CustomFormHeaders/CustomHeaderWithNavEdit";

const PlankDetail = () => {
  const { id } = useParams();
  const [plank, setPlank] = useState(null);
  const [length, setLength] = useState(null);
  const [treeId, setTreeId] = useState(null);
  const [species, setSpecies] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openImage2, setOpenImage2] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlank = async () => {
      try {
        const response = await axios.get(
          `https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/plank/${id}/`,
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

  if (!plank) {
    return <p>Loading...</p>;
  }

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

  //Image Dialog

 const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
 const handleOpenImage2 = () => setOpenImage2(true);
  const handleCloseImage2 = () => setOpenImage2(false);

  return (
    <PageContentContainer>
      <Grid Container>
        <CustomHeaderWithNavEdit
          title={`Plank ${id} Info`}
          handleGoBack={handleGoBack}
          handleEditClick={handleEditClick}
        />
        <Grid item container xs={12}>
          <Link to={`/report/${plank.id}/`}>
            <Button small>
              <FontAwesomeIcon icon={faFile} />
            </Button>
          </Link>
        </Grid>
        <Grid item container xs={12}>
          
              <Table bordered>
                <tbody>

                  <tr>
                    <th>Date:</th>
                    <td>{plank.date}</td>
                  </tr>
                  <tr>
                    <th>Width:</th>
                    <td>{plank.width}</td>
                  </tr>
                  <tr>
                    <th>Depth:</th>
                    <td>{plank.depth}</td>
                  </tr>
                  <tr>
                    <th>Length:</th>
                    <td>{length}</td>
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
                </tbody>
              
                </Table>
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
                      <strong>Categories:</strong>
                      
                      <Grid container xs={12} p={2} >
                
                        <Grid item container lg={3}  sm={3} xs={6} >
                          <p>
                            Live-Edge: {getLiveEdgeStatus(plank?.live_edge)}
                          </p>
                          </Grid>
                          <Grid item container  lg={3} sm={3} xs={6}>
                          <p>
                            Furniture: {getFurnitureStatus(plank?.furniture)}
                          </p>
                          </Grid>
                          <Grid item container  lg={3}  sm={3} xs={6}>
                        
                          <p>
                            Structural: {getStructuralStatus(plank?.structural)}
                          </p>
                          </Grid>
                          <Grid item container  lg={3}  sm={3} xs={6}>
                          <p>General: {getGeneralStatus(plank?.general)}</p>
                          </Grid>
                        
                      
                      </Grid>
                    </td>
                  </tr>
                  <Grid item container xs={12}>
                    <Grid item container xs={6}
                     onClick={plank.image1 ? handleOpenDialog : undefined} // Only set onClick handler if tree.image exists
                     style={{ cursor: plank.image1 ? "pointer" : "default" }} // Change cursor style based on tree.image existence
                    >
             
                    <td colSpan={2}>
                      Image 1
                      {plank.image1 && (
                        <img
                          src={plank.image1}
                          alt="Tree Image"
                          style={{ maxWidth: "100%", height: "auto" }}
                        />
                      )}
                    </td>
               
                  </Grid>
                  <Grid item container xs={6}
                  onClick={plank.image2 ? handleOpenImage2 : undefined} // Only set onClick handler if tree.image exists
                  style={{ cursor: plank.image2 ? "pointer" : "default" }} // Change cursor style based on tree.image existence
                 >
                 
                    <td colSpan={2}>
                      Image 2
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
                maxWidth="lg" // Adjust the maximum size of the dialog if needed
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
                maxWidth="lg" // Adjust the maximum size of the dialog if needed
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
      </Grid>
    </PageContentContainer>
  );
};

const Marker = () => <div className={css.marker}></div>;

export default PlankDetail;
