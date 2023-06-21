import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MoistureByPlank = () => {
  const [moistureChecks, setMoistureChecks] = useState([]);
  const [plankId, setPlankId] = useState('');

  const fetchMoistureChecksByPlank = async () => {
    try {
      const response = await axios.get(`https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/water/by_plank/?plank_id=${plankId}`);
      setMoistureChecks(response.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const handleSearch = () => {
    if (plankId) {
      fetchMoistureChecksByPlank();
    }
  };

  return (
    <div>
      <h1>Moisture Checks by Plank ID</h1>
      <input type="number" placeholder="Enter Plank ID" value={plankId} onChange={(e) => setPlankId(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      {moistureChecks.length > 0 ? (
        <div>
          <h2>Moisture Checks for Plank ID: {plankId}</h2>
          {moistureChecks.map((water) => (
            <div key={water.id}>
              <h3>Moisture Check ID: {water.id}</h3>
              <p>Date: {water.date}</p>
              <p>Water %: {water.water_percentage}</p>
              
              {/* Display other log information */}
            </div>
          ))}
        </div>
      ) : (
        <p>No planks found for Log ID: {plankId}</p>
      )}
    </div>
  );
};

export default MoistureByPlank;
