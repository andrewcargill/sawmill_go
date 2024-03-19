import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography } from "@mui/material";

const PlankMoisture = ({ plankId }) => {
  const [moistureChecks, setMoistureChecks] = useState([]);
  // const plankId = 100;
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    fetchMoistureChecksByPlank();
  }, []);

  const fetchMoistureChecksByPlank = async () => {
    try {
      const response = await axios.get(
        `https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/water/by_plank/?plank_id=${plankId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      setMoistureChecks(response.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  const handleSearch = () => {
    if (plankId) {
      fetchMoistureChecksByPlank();
    }
  };

  return (
    <div className="mainContainer">
      <h6>Moisture Content</h6>

      {moistureChecks && moistureChecks.length > 0 ? (
        <div>
          {moistureChecks.map((water) => (
            <Grid item key={water.id} border={"1px solid black"}>
              <Typography pl={2}>
                {water.date} = {water.water_percentage}%
              </Typography>
            </Grid>
          ))}
        </div>
      ) : (
        <p>No moisture checks found.</p>
      )}
    </div>
  );
};

export default PlankMoisture;
