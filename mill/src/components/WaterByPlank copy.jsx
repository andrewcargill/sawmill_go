import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

const WaterByPlank = ({ plankId }) => {
  const [moistureChecks, setMoistureChecks] = useState([]);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const fetchWaterByPlank = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/water/by_plank/?plank_id=${plankId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setMoistureChecks(response.data);
      console.log("data", response.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  useEffect(() => {
    if (plankId) {
      fetchWaterByPlank();
    }
  }, [plankId]);

  return (
    <div>
      {moistureChecks && moistureChecks.length > 0 ? (
        <div className="button-container">
          {moistureChecks.map((water) => (
            <div className="water-button-link" key={water.id}>
              <Button id="water-detail-button">
                <p>Date: {water.date}</p>
                <p>Moisture: {water.water_percentage}%</p>
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p>No records found for Plank ID: {plankId}</p>
      )}
    </div>
  );
};

export default WaterByPlank;
