import React, { useEffect, useState } from "react";
import axios from "axios";
import TreeMoisturePost from "./TreeMoisturePost";
import TreeMoistureEditForm from "./TreeMoistureEditForm";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import CustomFormHeading from "../components/CustomForm/CustomFormHeading";
import FormBoxMain from "../components/CustomForm/FormBoxMain";
import CustomInput from "../components/CustomForm/CustomInput";

const TreeMoistureCrud = () => {
  const [data, setData] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [idSearchQuery, setIdSearchQuery] = useState("");

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const params = {};
      if (searchQuery) {
        params.search = searchQuery;
      }
      if (idSearchQuery) {
        params.id = idSearchQuery;
      }

      const response = await axios.get(`${API_BASE_URL}/water/`, {
        params,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (id) => {
    setSelectedItemId(id);
  };

  const handleCancelEdit = () => {
    setSelectedItemId(null);
  };

  const handleSaveEdit = () => {
    setSelectedItemId(null);
    fetchData();
  };

  const handleDelete = (id) => {
    setConfirmDelete(true);
    setDeleteItemId(id);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/water/${deleteItemId}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      setConfirmDelete(false);
      setDeleteItemId(null);
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
    setDeleteItemId(null);
  };

  const handleSearch = () => {
    fetchData();
  };

  const handleIdSearch = () => {
    const id = parseInt(idSearchQuery);
    setIdSearchQuery(id);
    fetchData();
  };

  return (
    <div>
      <CustomFormHeading title="Moisture Check Database" />
      <FormBoxMain></FormBoxMain>
      <div className="mainContainer">
        <Container style={{ paddingTop: "3%" }}>
          {/* Add new moisture check */}

          <TreeMoisturePost />

          <Paper style={{ marginBottom: "3%", marginTop: "3%" }}>
            <Typography variant="h5" style={{ padding: "1%" }}>
              Search for Moisture Check
            </Typography>
          
            <div>
              
              <Box p={3}>
                <Grid container spacing={3}>
              
              <Grid item xs={6}>
              <CustomInput
                type="number"
                value={idSearchQuery}
                onChange={(e) => setIdSearchQuery(e.target.value)}
              />
              </Grid>
              <Grid item xs={6}>
              <Button variant="contained" color="info" onClick={handleIdSearch}>Search by ID</Button>
              </Grid>
              </Grid>
              </Box>
            
            </div>

            {data.map((item) => (
              <Box border={'2px solid black'} borderRadius={'10px'} p={1} m={2}>

              <div key={item.id}>
                {selectedItemId === item.id ? (
                  <TreeMoistureEditForm
                    id={item.id}
                    initialData={item}
                    onCancel={handleCancelEdit}
                    onSave={handleSaveEdit}
                  />
                ) : (
                  <>
                    <Grid container spacing={3}>
                      <Grid item xs={2}>
                        <Typography variant="h6">
                          Plank ID: {item.plank}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography>Id: {item.id}</Typography>
                      </Grid>
                      <Grid container item xs={3}>
                        <Grid item xs={12}>
                          <Typography>Date: {item.date}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography>
                            Water: {item.water_percentage}%
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={2}>
                    

                      <Button variant="contained" onClick={() => handleEdit(item.id)}>Edit</Button>
                      </Grid>
                    {confirmDelete && deleteItemId === item.id ? (
                      <>
                        <p>Are you sure you want to delete this item?</p>
                        <button onClick={handleConfirmDelete}>Yes</button>
                        <button onClick={handleCancelDelete}>No</button>
                      </>
                    ) : (
                      <Grid item xs={2}>
                      <Button variant="contained" color="warning" onClick={() => handleDelete(item.id)}>
                        Delete
                      </Button>
                      </Grid>
                    )}
                        </Grid>
                   

                  
                  </>
                )}
              </div>
              </Box>
            ))}
          </Paper>
        </Container>
      </div>
    </div>
  );
};

export default TreeMoistureCrud;
