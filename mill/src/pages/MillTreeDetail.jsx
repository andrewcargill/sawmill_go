import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "@googlemaps/js-api-loader";
import { Table } from "react-bootstrap";
import LogsByTree from "../components/LogsbyTree";
import PageContentContainer from "../components/CustomBoxes/PageContentContainer";
import { Grid, Typography, Dialog, DialogContent } from "@mui/material";
import CustomHeaderWithNavEdit from "../components/CustomFormHeaders/CustomHeaderWithNavEdit";

const TreeDetail = () => {
  const { id } = useParams();
  const [tree, setTree] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const mapRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const response = await axios.get(
          `https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/tree/${id}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setTree(response.data);
        console.log("single tree data: ", response.data);
      } catch (error) {
        console.error("Error fetching tree:", error);
      }
    };

    fetchTree();
  }, [id]);

  useEffect(() => {
    if (tree?.latitude && tree?.longitude && window.google) {
      try {
        const map = new window.google.maps.Map(mapRef.current, {
          center: {
            lat: parseFloat(tree.latitude),
            lng: parseFloat(tree.longitude),
          },
          zoom: 18,
          mapTypeId: "satellite",
        });

        new window.google.maps.Marker({
          position: {
            lat: parseFloat(tree.latitude),
            lng: parseFloat(tree.longitude),
          },
          map: map,
        });
      } catch (error) {
        console.error("Error creating Google Map:", error);
      }
    } else {
      const loader = new Loader({
        apiKey: "AIzaSyBTF9lCKZ8YoQS9GngDlBuGkrwmL9glt5U",
      });

      loader
        .load()
        .then(() => {
          if (tree?.latitude && tree?.longitude) {
            const map = new window.google.maps.Map(mapRef.current, {
              center: {
                lat: parseFloat(tree.latitude),
                lng: parseFloat(tree.longitude),
              },
              zoom: 18,
              mapTypeId: "satellite",
            });

            new window.google.maps.Marker({
              position: {
                lat: parseFloat(tree.latitude),
                lng: parseFloat(tree.longitude),
              },
              map: map,
            });
          }
        })
        .catch((e) => {
          console.error("Error loading Google Maps", e);
        });
    }
  }, [tree]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEditClick = () => {
    navigate(`/tree/${id}/edit`);
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  if (!tree) {
    return <p>Loading...</p>;
  }

  return (
    <PageContentContainer>
      <Grid container>
        <Grid item container>
          <CustomHeaderWithNavEdit
            title={`Tree ${id} Info`}
            handleGoBack={handleGoBack}
            handleEditClick={handleEditClick}
          />

          <Grid item container xs={12}>
            <Table bordered>
              <tbody>
                <tr>
                  <th>Date:</th>
                  <td>{tree.date}</td>
                </tr>
                <tr>
                  <th>Species:</th>
                  <td>{tree.species}</td>
                </tr>
                <tr>
                  <th>Age:</th>
                  <td>{tree.age}</td>
                </tr>
                <tr>
                  <th>Lumberjack:</th>
                  <td>{tree.lumberjack}</td>
                </tr>
                <tr>
                  <th>Latitude:</th>
                  <td>{tree.latitude}</td>
                </tr>
                <tr>
                  <th>Longitude:</th>
                  <td>{tree.longitude}</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td colSpan={2}>
                    <strong>Reason For Felling:</strong>
                    <p>{tree.reason_for_felling}</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <strong>Logs:</strong>

                    <Grid item container xs={12}>
                      <LogsByTree treeId={id} />
                    </Grid>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Grid>
        </Grid>

        <Grid item container>
          <Grid item container xs={12} spacing={2} pb={10}>
            <Grid item xs={6}>
              <div
                style={{ height: "400px", width: "100%" }}
                ref={mapRef}
                className="pb-4"
              >
                {/* Map will be rendered here */}
                {!tree.latitude || !tree.longitude ? <p>NO GPS DATA.</p> : null}
              </div>
            </Grid>
            <Grid item container xs={6}>
              <Grid
                item
                container
                maxHeight={400}
                alignContent={"center"}
                justifyContent={"center"}
                bgcolor={"lightgrey"}
                onClick={tree.image ? handleOpenDialog : undefined}
                style={{ cursor: tree.image ? "pointer" : "default" }}
              >
                {tree.image ? (
                  <img
                    src={tree.image}
                    alt="Tree Image"
                    style={{ maxWidth: "100%", height: "auto", maxHeight: 400 }}
                  />
                ) : (
                  <Typography variant="h6" style={{ textAlign: "center" }}>
                    No tree image saved
                  </Typography> 
                )}
              </Grid>

              {/* Dialog for displaying the image */}
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
                  {tree.image && (
                    <img
                      src={tree.image}
                      alt="Tree Image"
                      style={{ maxWidth: "80vh", height: "auto" }}
                    />
                  )}
                </DialogContent>
              </Dialog>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContentContainer>
  );
};


export default TreeDetail;
