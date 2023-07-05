import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const WaterByPlank = ({ plankId }) => { // Accept treeId as a prop
  console.log('hitting WaterByPlank')
  // Remove the useState for treeId and its corresponding onChange handler

  const [moistureChecks, setMoistureChecks] = useState([]);

  const fetchWaterByPlank = async () => {
    try {
      const response = await axios.get(
        `https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/water/by_plank/?plank_id=${plankId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
      setMoistureChecks(response.data);
      console.log("data", response.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  useEffect(() => {
    if (plankId) {
      fetchWaterByPlank();
    }
  }, [plankId]); // Fetch logs when the treeId prop changes




  return (
    <div>


      {/* Remove the input field and button for searching */}

      {moistureChecks && moistureChecks.length > 0 ? (
        <div className='button-container'>
          {moistureChecks.map((water) => (
           <Link classname='button-link' key={water.id} to={`/log/${water.id}`}>
            <Button id='detail-button'>
              <h3>Check ID: {water.id}</h3>
              <p>Date: {water.date}</p>
              <p>%: {water.water_percentage}</p>
       
            </Button>
            </Link>
        
          ))}
        </div>
      ) : (
        <p>No logs found for Tree ID: {plankId}</p>
      )}
    </div>
  );
};

export default WaterByPlank;
