import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

import css from "../styles/millAddLog.module.css";
import axios from "axios";
import CustomFormHeading from "../components/CustomForm/CustomFormHeading";
import { Box, Button, Grid } from "@mui/material";
import CustomDatePicker from "../components/CustomForm/CustomDatePicker";
import FormBoxMain from "../components/CustomForm/FormBoxMain";
import CustomInput from "../components/CustomForm/CustomInput";
import CustomHeaderWithNav from "../components/CustomFormHeaders/CustomHeaderWithNav";

const MillAddLogs = () => {
  const [tree, setTree] = useState("");
  const [date, setDate] = useState("");
  const [length, setLength] = useState("");
  const [diameter, setDiameter] = useState("");
  const [buck, setBuck] = useState(false);
  const [success, setSuccess] = useState(false);
  const [postId, setPostId] = useState(null);
  const [treeIdExists, setTreeIdExists] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/log/",
        {
          date,
          tree,
          length,
          buck,
          diameter,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log("Data created:", response.data);

      // Reset form fields after successful submission
      setDate("");
      setTree("");
      setLength("");
      setBuck(false);

      setPostId(response.data.id);
      setSuccess(true); // Set success status to true
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  const handleTreeChange = (e) => {
    const treeId = e.target.value;
    setTree(treeId);
  };

  const handleTreeBlur = async () => {
    try {
      const response = await axios.get(
        `https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/tree/validate/${tree}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      const { exists } = response.data;
      console.log("TreeIdExists:", exists);
      setTreeIdExists(exists);
    } catch (error) {
      console.error("Error validating tree ID:", error);
    }
  };

  /* Update date state */
  const handleDateChange = (formattedDate) => {
    setDate(formattedDate);
  };

  // Navigation to Mill Home
  const navigate = useNavigate();

  const handleButtonClick = (route) => {
    navigate(route);
  };

  const handleBuckClick = () => {
    setBuck(!buck);
  };

  return (
    <div style={{ paddingTop: "1%" }}>
      <CustomHeaderWithNav title="+ log" />
      <FormBoxMain>
        <form onSubmit={handleSubmit}>
          {/* Custom Date Field */}
          <Grid container spacing={1} pt={1}>
            <Grid item xs={12}>
              <CustomDatePicker value={date} onChange={handleDateChange} />
            </Grid>

            {/* Custom Tree ID Field */}
            <Grid item xs={12}>
              <CustomInput
                label="Tree ID"
                type="number"
                value={tree}
                onChange={handleTreeChange}
                onBlur={handleTreeBlur}
                required
                inputMode="numeric"
              />
            </Grid>
            {treeIdExists !== null && !treeIdExists && (
              <Grid item xs={12}>
                <Box>ID not in system</Box>
              </Grid>
            )}

            {/* Length */}
            <Grid item xs={12}>
              <CustomInput
                label="Length (cm)"
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                required
                inputMode="numeric"
              />
            </Grid>
            {/* Diameter */}
            <Grid item xs={12}>
              <CustomInput
                label="Diameter (cm)"
                type="number"
                value={diameter}
                onChange={(e) => setDiameter(e.target.value)}
                required
                inputMode="numeric"
              />
            </Grid>
            {/* Buck */}
            <Grid item xs={12} marginTop={1}>
              <Button
                fullWidth
                variant="contained"
                color={buck ? "primary" : "secondary"}
                onClick={handleBuckClick}
              >
                {buck ? "BUCk log!" : "BUCK log?"}
              </Button>
            </Grid>
            {success && (
        <Grid item xs={12}>
          <Alert variant="success" className={css.alert}>
            Log added successfully with ID: {postId}
          </Alert>
        </Grid>
      )}

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              disabled={!treeIdExists}
            >
              Save
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
        <Button
          fullWidth
          variant="contained"
          color="dark"
          onClick={() => handleButtonClick("/mill_home")}
        >
          Back to Mill Home
        </Button>
      </Grid>
          </Grid>
        </form>
      </FormBoxMain>

    

    
      
    </div>
  );
};

export default MillAddLogs;
