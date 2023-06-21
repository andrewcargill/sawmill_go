import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlanksByLog = () => {
  const [planks, setPlanks] = useState([]);
  const [logId, setLogId] = useState('');

  const fetchPlanksByLog = async () => {
    try {
      const response = await axios.get(`https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/planks/by_log/?log_id=${logId}`);
      setPlanks(response.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const handleSearch = () => {
    if (logId) {
      fetchPlanksByLog();
    }
  };

  return (
    <div>
      <h1>Planks by Log</h1>
      <input type="number" placeholder="Enter Tree ID" value={logId} onChange={(e) => setLogId(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      {planks.length > 0 ? (
        <div>
          <h2>Planks for Log ID: {logId}</h2>
          {planks.map((plank) => (
            <div key={plank.id}>
              <h3>Plank ID: {plank.id}</h3>
              <p>Width: {plank.width}</p>
              <p>Depth: {plank.depth}</p>
              <p>Wood Grade: {plank.wood_grade}</p>
              {/* Display other log information */}
            </div>
          ))}
        </div>
      ) : (
        <p>No planks found for Log ID: {logId}</p>
      )}
    </div>
  );
};

export default PlanksByLog;
