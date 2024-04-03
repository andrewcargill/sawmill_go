import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, BarChart, Area, AreaChart, ResponsiveContainer } from 'recharts';
import { Button } from "react-bootstrap";

function CustomTickFormatter(tick) {
  // Extract the year and remove the first 2 characters, then reassemble the date string
  const shortYearDate = tick.slice(2);
  return shortYearDate;
}

const WaterByPlank = ({ plankDate, plankId }) => {
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
      // Format data for the chart
      const formattedData = response.data.map(check => ({
        date: check.date, // Assuming 'date' is in 'YYYY-MM-DD' format
        moisture: parseFloat(check.water_percentage), // Ensure moisture is a number
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

      setMoistureChecks(formattedData);
      console.log("Fetched checks:", formattedData);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  useEffect(() => {
    if (plankId) {
      fetchWaterByPlank();
    }
  }, [plankId]);

  // Getting today's date in 'YYYY-MM-DD' format
  const todayDate = new Date().toISOString().split('T')[0];

  return (

      <>
      {moistureChecks &&moistureChecks.length > 0 ? (
        <ResponsiveContainer width="100%" height={200}>
        <AreaChart
      
        data={moistureChecks}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={CustomTickFormatter}  />
         <YAxis domain={[0, 40]} label={{ value: '%', angle: -90, position: 'insideLeft', style: { fill: '#79c000'} }} />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="moisture" stroke="#79c000" fill="#79c000" />
      </AreaChart>
      </ResponsiveContainer>
      ) : (
        <p>No moisture records found for Plank ID: {plankId}</p>
      )}
     
      </>
  );
};

export default WaterByPlank;
