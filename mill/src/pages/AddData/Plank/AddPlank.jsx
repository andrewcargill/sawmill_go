import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CustomDatePicker from "../../../components/CustomForm/CustomDatePicker";
import CustomInput from "../../../components/CustomForm/CustomInput";
import CustomDropdown from "../../../components/CustomForm/CustomDropDown";
import CustomTextArea from "../../../components/CustomForm/CustomTextArea";
import FormBoxMain from "../../../components/CustomForm/FormBoxMain";
import axios from "axios";
import dayjs from "dayjs";
import CustomHeaderWithNav from "../../../components/CustomFormHeaders/CustomHeaderWithNav";

const AddPlank = () => {
  /* FROM OLD FORM */
  const [log, setLog] = useState("");
  const [date, setDate] = useState(null);
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [wood_grade, setWood_grade] = useState("");
  const [logIdExists, setLogIdExists] = useState(null);
  const [live_edge, setLive_edge] = useState(false);
  const [furniture, setFurniture] = useState(false);
  const [structural, setStructural] = useState(false);
  const [general, setGeneral] = useState(false);
  const [operator, setOperator] = useState("");
  const [info, setInfo] = useState("");
  const [imageOne, setImageOne] = useState("");
  const [imageOneReader, setImageOneReader] = useState("");
  const [imageTwo, setImageTwo] = useState("");
  const [imageTwoReader, setImageTwoReader] = useState("");
  const [success, setSuccess] = useState(false);
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    console.log("imageOne:", imageOne);
    console.log("imageTwo:", imageTwo);
  }, [imageOne, imageTwo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem("access_token");
      const formData = new FormData();
      formData.append("date", date);
      formData.append("log", log);
      formData.append("width", width);
      formData.append("depth", depth);
      formData.append("wood_grade", wood_grade);
      formData.append("live_edge", live_edge);
      formData.append("furniture", furniture);
      formData.append("structural", structural);
      formData.append("general", general);
      formData.append("operator", operator);
      formData.append("info", info);
      console.log(
        "adding data: ",
        date,
        log,
        width,
        depth,
        wood_grade,
        live_edge,
        furniture,
        structural,
        general,
        operator,
        info
      );

      if (imageOne !== "") {
        formData.append("image1", imageOne);
      }

      if (imageTwo !== "") {
        formData.append("image2", imageTwo);
      }

      const response = await axios.post(
        "https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/plank/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Data created:", response.data);

      setLog("");
      setWidth("");
      setDepth("");
      setWood_grade("");
      setDate("");
      setLive_edge(false);
      setFurniture(false);
      setStructural(false);
      setGeneral(false);
      setInfo("");
      setOperator("");
      setImageOne("");
      setImageTwo("");
      setImageOneReader("");
      setImageTwoReader("");

      setPostId(response.data.id);
      setSuccess(true); // Set success status to true
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  const handleLogChange = (e) => {
    const logId = e.target.value;
    setLog(logId);
  };

  const handleLogBlur = async () => {
    try {
      const response = await axios.get(
        `https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/log/validate/${log}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      const { exists } = response.data;
      console.log("LogIdExists:", exists);
      setLogIdExists(exists);
    } catch (error) {
      console.error("Error validating log ID:", error);
    }
  };

  const handleLiveEdgeClick = () => {
    setLive_edge(!live_edge);
  };
  const handleFurnitureClick = () => {
    setFurniture(!furniture);
  };
  const handleStructuralClick = () => {
    setStructural(!structural);
  };
  const handleGeneralClick = () => {
    setGeneral(!general);
  };

  /// Navigation to Mill Home

  const navigate = useNavigate();

  const handleButtonClick = (route) => {
    navigate(route);
  };

  /* Image upload */
  const [image1Url, setImage1Url] = useState(null);
  const [image2Url, setImage2Url] = useState(null);

  const handleImageOneUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    setImageOne(file);

    reader.onloadend = () => {
      setImageOneReader(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleImageTwoUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    setImageTwo(file);

    reader.onloadend = () => {
      setImageTwoReader(reader.result);
    };

    reader.readAsDataURL(file);
  };

  /* Update date state */
  const handleDateChange = (formattedDate) => {
    setDate(formattedDate);
  };

  return (
    <div style={{ paddingTop: '1%'}}>
      {/* Custom header */}
      <CustomHeaderWithNav title="+ plank" />
      <FormBoxMain>
        <form onSubmit={handleSubmit}>
          {/* Custom Date Field */}
          <Grid container spacing={1} pt={1}>
            <Grid item xs={12}>
              <CustomDatePicker value={date} onChange={handleDateChange} />
            </Grid>

            {/* LumberJack*/}
            <Grid item xs={12}>
              <CustomDropdown
                label="Operator"
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                required
                options={[
                  { label: "Andy", value: "Andrew Cargill" },
                  { label: "Jens", value: "Jens Nyman" },
                  {
                    label: "Andy & Jens",
                    value: "Andrew Cargill & Jens Nyman",
                  },
                  {
                    label: "Andy & Charlie",
                    value: "Andrew Cargill & Charles Cargill",
                  },
                ]}
              />
            </Grid>

            {/* Log ID */}
            <Grid item xs={12}>
              <CustomInput
                label="Log ID"
                type="number"
                value={log}
                onChange={handleLogChange}
                onBlur={handleLogBlur}
                required
                inputMode="numeric"
              />
            </Grid>
            {logIdExists !== null && !logIdExists && (
              <Grid item xs={12}>
                <Box>ID not in system</Box>
              </Grid>
            )}

            {/* Width */}
            <Grid item xs={12}>
              <CustomInput
                label="Width (cm)"
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                required
                inputMode="numeric"
              />
            </Grid>
            {/* Depth */}
            <Grid item xs={12}>
              <CustomInput
                label="Depth (cm)"
                type="number"
                value={depth}
                onChange={(e) => setDepth(e.target.value)}
                required
                inputMode="numeric"
              />
            </Grid>

            {/* Grade */}
            <Grid item xs={12}>
              <CustomDropdown
                label="Wood Grade"
                value={wood_grade}
                onChange={(e) => setWood_grade(e.target.value)}
                required
                options={[
                  { label: "1", value: "1" },
                  { label: "2", value: "2" },
                  { label: "3", value: "3" },
                  { label: "4", value: "4" },
                ]}
              />
            </Grid>

            {/*Info*/}
            <Grid item xs={12}>
              <CustomTextArea
                label="Operator Information"
                value={info}
                onChange={(e) => setInfo(e.target.value)}
              />
            </Grid>

            {/*Select*/}
            <Box p={2}>
              <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
                {/*Select*/}
                <Typography variant="h6" gutterBottom>
                  Select Categories
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      fullWidth
                      color={general ? "primary" : "secondary"}
                      onClick={handleGeneralClick}
                    >
                      General
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color={furniture ? "primary" : "secondary"}
                      onClick={handleFurnitureClick}
                      fullWidth
                    >
                      Furniture
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color={structural ? "primary" : "secondary"}
                      onClick={handleStructuralClick}
                      fullWidth
                    >
                      Structural
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color={live_edge ? "primary" : "secondary"}
                      onClick={handleLiveEdgeClick}
                      fullWidth
                    >
                      Live-Edge
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Box>

            <Box p={2} sx={{ width: "100%" }}>
              <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
                {/*Select*/}
                <Typography variant="h6" gutterBottom>
                  Image Upload
                </Typography>
                {/*Image 1 Upload*/}
                <Grid container spacing={2} xs={12}>
                  <Grid item xs={6}>
                    <label htmlFor="upload-image-1">
                      <Button
                        variant="contained"
                        color="secondary"
                        component="span"
                        fullWidth
                      >
                        Image 1
                      </Button>
                      <input
                        id="upload-image-1"
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleImageOneUpload}
                      />
                    </label>
                    {imageOneReader && (
                      <img
                        src={imageOneReader}
                        alt="Uploaded Image"
                        width="100%"
                      />
                    )}
                  </Grid>

                  {/*Image 2 Upload*/}
                  <Grid item xs={6}>
                    <label htmlFor="upload-image-2">
                      <Button
                        variant="contained"
                        color="secondary"
                        component="span"
                        fullWidth
                      >
                        Image 2
                      </Button>
                      <input
                        id="upload-image-2"
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleImageTwoUpload}
                      />
                    </label>
                    {imageTwoReader && (
                      <img
                        src={imageTwoReader}
                        alt="Uploaded Image"
                        width="100%"
                      />
                    )}
                  </Grid>
                </Grid>
              </Paper>
            </Box>
            {success && (
              <Grid item xs={12}>
                <Alert severity="success">
                  <p>Success! Data Stored.</p>
                  <div>Plank ID: {postId}</div>{" "}
                </Alert>
              </Grid>
            )}
            {/*Submit Button*/}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormBoxMain>
    </div>
  );
};

export default AddPlank;
