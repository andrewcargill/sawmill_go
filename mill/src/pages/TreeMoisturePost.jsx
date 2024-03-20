import React, { useState } from "react";
import axios from "axios";
import { Alert, Button, Container, Grid } from "@mui/material";
import CustomDatePicker from "../components/CustomForm/CustomDatePicker";
import CustomInput from "../components/CustomForm/CustomInput";

const TreeMoisturePost = () => {
  const [plank, setPlank] = useState("");
  const [date, setDate] = useState("");
  const [water_percentage, setWater_percentage] = useState("");
  const [success, setSuccess] = useState(false);
  const [plankIdExists, setPlankIdExists] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_BASE_URL}/water/`,
        {
          date,
          plank,
          water_percentage,
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
      setPlank("");
      setWater_percentage("");

      setSuccess(true); // Set success status to true
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  const handlePlankChange = (e) => {
    const plankId = e.target.value;
    setPlank(plankId);
  };

  const handlePlankBlur = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/plank/validate/${plank}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      const { exists } = response.data;
      console.log("PlankIdExists:", exists);
      setPlankIdExists(exists);
    } catch (error) {
      console.error("Error validating Plank ID:", error);
    }
  };

  /* Update date state */
  const handleDateChange = (formattedDate) => {
    setDate(formattedDate);
  };

  return (
    <div className="mainContainer">
      <h3>Add new check</h3>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <CustomDatePicker
              value={date}
              onChange={handleDateChange}
              required
            />
            {/* <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required /> */}
          </Grid>
      

        <Grid item xs={12}>
            <CustomInput 
            label="Plank ID"
            type="number"
            value={plank}
            onChange={handlePlankChange}
            onBlur={handlePlankBlur}
            required
            inputMode="numeric"
            />
      
          {plankIdExists !== null && !plankIdExists && (
            <div>ID not in system</div>
          )}
    
        </Grid>
        <Grid item xs={12}>
          <CustomInput 
          label="Moisture Content %"
          type="number"
          value={water_percentage}
          onChange={(e) => setWater_percentage(e.target.value)}
          required
          />
        
        </Grid>
        </Grid>

        <Button type="submit" color="primary" variant="contained" fullWidth disabled={!plankIdExists}>
          Submit
        </Button>
      </form>

      {success && 
      <Alert severity="success">
      <p>Success! Data saved.</p>
      </Alert>
      }
    </div>
  );
};

export default TreeMoisturePost;
