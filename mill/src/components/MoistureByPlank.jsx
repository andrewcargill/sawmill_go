import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TreeMoistureEditForm from '../pages/TreeMoistureEditForm';


const MoistureByPlank = () => {
  const [moistureChecks, setMoistureChecks] = useState([]);
  const [plankId, setPlankId] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    fetchMoistureChecksByPlank();
  }, []);

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

  const handleEdit = (id) => {
    setSelectedItemId(id);
  };

  const handleCancelEdit = () => {
    setSelectedItemId(null);
  };

  const handleSaveEdit = () => {
    setSelectedItemId(null);
    fetchMoistureChecksByPlank();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://sawmill-live-api-ecf54c3f35e6.herokuapp.com/api/water/${id}/`);
      fetchMoistureChecksByPlank();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div className='mainContainer'>
      <h1>Moisture Checks by Plank ID</h1>
      <input type="number" placeholder="Enter Plank ID" value={plankId} onChange={(e) => setPlankId(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      {moistureChecks.length > 0 ? (
        <div>
          <h2>Moisture Checks for Plank ID: {plankId}</h2>
          {moistureChecks.map((water) => (
            <div key={water.id}>
              {selectedItemId === water.id ? (
                <TreeMoistureEditForm
                  id={water.id}
                  initialData={water}
                  onCancel={handleCancelEdit}
                  onSave={handleSaveEdit}
                />
              ) : (
                <>
                  <h3>Moisture Check ID: {water.id}</h3>
                  <p>Date: {water.date}</p>
                  <p>Water %: {water.water_percentage}</p>
                  
                  {/* Display other log information */}
                  <button onClick={() => handleEdit(water.id)}>Edit</button>
                  <button onClick={() => handleDelete(water.id)}>Delete</button>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No planks found for Plank ID: {plankId}</p>
      )}
    </div>
  );
};

export default MoistureByPlank;
