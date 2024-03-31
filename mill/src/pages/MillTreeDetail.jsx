import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "@googlemaps/js-api-loader";
import { Table } from "react-bootstrap";
import LogsByTree from "../components/LogsbyTree";
import PageContentContainer from "../components/CustomBoxes/PageContentContainer";
import {
  Grid,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  Button,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import CustomHeaderWithNavEdit from "../components/CustomFormHeaders/CustomHeaderWithNavEdit";
import EditIcon from "@mui/icons-material/Edit";

const TreeDetail = () => {
  const { id } = useParams();
  const [tree, setTree] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const mapRef = useRef(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/tree/${id}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
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

  const handleSaveClick = async () => {
    const payload = { ...tree };

    delete payload.image;

    try {
      // PUT request to update the tree. Adjust the URL and data as needed.
      const response = await axios.put(`${API_BASE_URL}/tree/${id}/`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log("Update response: ", response.data);
      // Successfully saved changes
      setIsEditing(false); // Exit editing mode
      // Optionally, you might want to fetch the tree data again to ensure the UI is updated with the saved data
    } catch (error) {
      console.error("Error saving tree:", error);
      // Handle errors (e.g., show an error message)
    } finally {
      setIsEditing(false);
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append all current tree fields to formData
    Object.keys(tree).forEach((key) => {
      if (key !== "image") {
        formData.append(key, tree[key]);
        
      }
    });

    // Append the new image file under the 'image' key only if it's selected
    if (selectedImage) {
      console.log("Selected image:", selectedImage);
      formData.append("image", selectedImage);
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/tree/${id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            // 'Content-Type': 'multipart/form-data' is set automatically by the browser
          },
        }
      );
      console.log("Tree updated successfully:", response.data);
      // After a successful update, you might want to update the tree state
      // This could include setting the image to the new image URL returned by the server, if applicable
      setTree((prev) => ({
        ...prev,
        image: response.data.image || prev.image,
      }));
      setSelectedImage(null); // Clear the selected image
      handleCloseImageModal(); // Close the modal
    } catch (error) {
      console.error("Error updating the tree with new image:", error);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTree((prevTree) => ({
      ...prevTree,
      [name]: value, // Dynamically updates the right property based on the input name
    }));
  };

  const handleEditClick = () => {
    // navigate(`/tree/${id}/edit`);
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleOpenImageModal = () => setOpenImageModal(true);
  const handleCloseImageModal = () => setOpenImageModal(false);

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
        </Grid>
        <Grid item container xs={12} sm={6} pt={1}>
          <Table bordered>
            <tbody>
              <tr>
                <th>Date:</th>
                <td>
                  {isEditing ? (
                    <input
                      name="date"
                      type="date"
                      value={tree.date}
                      onChange={handleInputChange}
                    />
                  ) : (
                    tree.date
                  )}
                </td>
              </tr>
              <tr>
                <th>Species:</th>
                <td>
                  {isEditing ? (
                    <input
                      name="species"
                      type="text"
                      value={tree.species}
                      onChange={handleInputChange}
                    />
                  ) : (
                    tree.species
                  )}
                </td>
              </tr>
              <tr>
                <th>Age:</th>
                <td>
                  {" "}
                  {isEditing ? (
                    <input
                      name="age"
                      type="text"
                      value={tree.age}
                      onChange={handleInputChange}
                    />
                  ) : (
                    tree.age
                  )}
                </td>
              </tr>
              <tr>
                <th>Lumberjack:</th>
                <td>
                  {isEditing ? (
                    <input
                      name="lumberjack"
                      type="text"
                      value={tree.lumberjack}
                      onChange={handleInputChange}
                    />
                  ) : (
                    tree.lumberjack
                  )}
                </td>
              </tr>
              <tr>
                <th>Latitude:</th>
                <td>
                  {isEditing ? (
                    <input
                      name="latitude"
                      type="text"
                      value={tree.latitude}
                      onChange={handleInputChange}
                    />
                  ) : (
                    tree.latitude
                  )}
                </td>
              </tr>
              <tr>
                <th>Longitude:</th>
                <td>
                  {isEditing ? (
                    <input
                      name="longitude"
                      type="text"
                      value={tree.longitude}
                      onChange={handleInputChange}
                    />
                  ) : (
                    tree.longitude
                  )}
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td colSpan={2}>
                  <strong>Reason For Felling:</strong>
                  <p>
                    {isEditing ? (
                      <textarea
                        name="reason_for_felling"
                        rows={2}
                        cols={50}
                        value={tree.reason_for_felling}
                        onChange={handleInputChange}
                      ></textarea>
                    ) : (
                      tree.reason_for_felling
                    )}
                  </p>
                </td>
              </tr>
            </tbody>
          </Table>

          {isEditing && (
            <Grid container xs={12} p={2}>
              <Grid
                item
                container
                alignItems={"center"}
                justifyContent={"flex-end"}
              >
                <Button
                  variant="contained"
                  style={{ margin: "5px" }}
                  onClick={handleSaveClick}
                >
                  save
                </Button>
                <Button
                  variant="contained"
                  color="dark"
                  onClick={handleCancelClick}
                >
                  cancel
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>

        <Grid item container xs={12} sm={6} pt={1}>
          <strong>Logs:</strong>

          <Grid item container xs={12}>
            <LogsByTree treeId={id} />
          </Grid>
        </Grid>

        <Grid item container>
          <Grid item container xs={12} spacing={2} pb={10}>
            <Grid item xs={12} sm={6}>
              <div
                style={{ height: "400px", width: "100%" }}
                ref={mapRef}
                className="pb-4"
              >
                {/* Map will be rendered here */}
                {!tree.latitude || !tree.longitude ? <p>NO GPS DATA.</p> : null}
              </div>
            </Grid>
            <Grid item container xs={12} sm={6}>
              <Grid
                item
                container
                xs={12}
                sm={6}
                style={{
                  position: "relative",
                  maxHeight: "400px",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "lightgrey",
                  cursor: tree.image ? "pointer" : "default",
                }}
                onClick={tree.image ? handleOpenDialog : undefined}
              >
                {tree.image ? (
                  <img
                    src={tree.image}
                    alt="Tree Image"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "400px",
                      display: "block",
                    }}
                  />
                ) : (
                  <Typography variant="h6" style={{ textAlign: "center" }}>
                    No tree image saved
                  </Typography>
                )}
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenImageModal();
                  }}
                  style={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    backgroundColor: "white",
                    opacity: 0.9,
                  }}
                  aria-label="edit image"
                >
                  <EditIcon />
                </IconButton>
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

              {/* Dialog for image edit */}
              <Dialog
                open={openImageModal}
                onClose={handleCloseImageModal}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  Upload New Image
                </DialogTitle>
                <form onSubmit={handleImageSubmit}>
                  <DialogContent>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      required
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setSelectedImage(e.target.files[0]);
                        }
                      }}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseImageModal}>Cancel</Button>
                    <Button type="submit">Upload</Button>
                  </DialogActions>
                </form>
              </Dialog>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContentContainer>
  );
};

export default TreeDetail;
